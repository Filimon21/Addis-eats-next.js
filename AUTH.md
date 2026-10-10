# Addis Eats Authentication and Authorization

## Session design

The application uses a signed session token stored in an HttpOnly cookie named
`addis-eats-session`.

The token contains a user ID, email, role, and expiration timestamp. Its
signature is generated with HMAC-SHA256 using the server-only `SESSION_SECRET`.

Cookie settings:
- HttpOnly
- SameSite=Lax
- Secure in production
- Path=/
- 24-hour maximum age

## Authentication

Demo customer:
- Email: customer@addiseats.com
- Password: Customer2026!

Demo kitchen staff:
- Email: kitchen@addiseats.com
- Password: Kitchen2026!

These hardcoded demo accounts are for coursework only. Production applications
must use persistent user storage and securely hashed passwords.

## Three protection layers

1. Middleware checks for a session cookie before protected routes are entered.
2. Protected pages validate the signed session and enforce the user's role.
3. Server actions and protected API handlers independently validate the session
   and authorization before reading or changing private data.

A cookie's existence alone is not proof of a valid session.

## Order ownership

Customer order history is filtered by the authenticated user's ID.
The order-status endpoint searches using both the order ID and authenticated
user ID. Cancellation repeats the ownership check in the server action.

Kitchen status changes require the kitchen role.

## Required security tests

### Test 1: Signed-out action

Expected: An unauthenticated cancellation attempt is rejected.

### Test 2: Another user's order

Expected: A customer cannot view or cancel another user's order by changing
the order ID. The status API returns 404 for an order the customer does not own.

### Test 3: External redirect

Open `/signin?next=https://example.com` and sign in as the demo customer.

Expected: The application redirects to `/orders`, not the external site.

## Limitations

This is a coursework demonstration. Orders are stored in memory and do not
provide durable database persistence. Hardcoded credentials must not be used
in production.s