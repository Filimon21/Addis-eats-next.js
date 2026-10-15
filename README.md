# Addis Eats — Upgraded Next.js Demo

A responsive Ethiopian food ordering coursework application built with Next.js App Router, React, JavaScript, and CSS.

## Features

- Home page and featured dishes
- Searchable menu and category filters
- Dish detail pages
- Shopping cart with quantity controls and totals
- Checkout form with client-side validation
- Demo customer and kitchen sign-in
- Demo order history and status progress
- Kitchen dashboard with order status controls
- Responsive layouts and basic SEO metadata

## Run locally

Use Node.js 20.9 or newer.

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000.

Build for production:

```powershell
npm.cmd run build
npm.cmd start
```

## Demo sign-in

Customer:
- Email: `customer@addiseats.com`
- Password: `Customer2026!`

Kitchen:
- Email: `kitchen@addiseats.com`
- Password: `Kitchen2026!`

## Important limitations

This is a learning/demo project, not a production ordering system. The cart, demo session, and orders use browser localStorage. Customer login is a hardcoded client-side demonstration and is not secure authentication. Data is local to the browser and does not synchronize between different users or devices. The kitchen dashboard can only see orders created in the same browser storage. There is no payment processing, real delivery dispatch, database, or server-side access control. Do not use these demo credentials or this authentication design for real customers.

For a production version, implement server-side authentication with hashed passwords, a database, secure HTTP-only session cookies, server-side authorization, input validation, rate limiting, and a real payment/delivery integration.
