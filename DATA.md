# Addis Eats Data Architecture

## Menu

Menu dishes are defined in `lib/dishes.js`. The menu page renders initial
dish data on the server. The `/api/dishes` endpoint supports searches by name,
description, and category.

The menu API advertises a short shared-cache lifetime. The SWR fetcher checks
the HTTP response and throws an error for unsuccessful responses.

## Debounced search

The client search input waits 350 milliseconds after typing stops before
updating the search query. SWR fetches the resulting API URL.

`keepPreviousData` keeps existing results visible while a new query loads.

## Orders

Order history is private and must be filtered using the authenticated user's
ID. Kitchen users access the kitchen dashboard through a role check.

## Order status

The server renders the initial order status. A client component then polls
the user-scoped status API every five seconds. The status endpoint disables
HTTP caching.

## Cart and checkout

This coursework version uses a simple checkout form that creates a demo order.
Payment processing is not implemented.

## Storage limitation

The sample orders are held in memory. Changes are not durable and may be lost
on restart or when deployed across multiple server instances. A real
application requires a persistent database and database-level ownership
queries.s