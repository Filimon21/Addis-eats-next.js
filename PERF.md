# Addis Eats Performance Report

## Measurement method

Use Lighthouse in Chrome DevTools to measure the deployed or production-build
application. Run tests under comparable conditions before and after each
optimization.

## Before optimization

Record the actual baseline results here.

- Performance score:
- Accessibility score:
- Best Practices score:
- SEO score:
- Largest Contentful Paint (LCP):
- Cumulative Layout Shift (CLS):
- Total Blocking Time (TBT):
- First Load JS for `/menu`:
- Largest image size:

## Optimizations

- Render public menu data on the server.
- Use debounced search to reduce unnecessary requests.
- Keep previous search results visible while new data loads.
- Add page metadata and public discovery routes.
- Avoid loading large unnecessary client-side dependencies.

## After optimization

Record actual results after rebuilding and retesting.

- Performance score:
- Accessibility score:
- Best Practices score:
- SEO score:
- Largest Contentful Paint (LCP):
- Cumulative Layout Shift (CLS):
- Total Blocking Time (TBT):
- First Load JS for `/menu`:
- Largest image size:

## Targets

- LCP under 2.5 seconds
- CLS under 0.1
- First Load JS for `/menu` under 120 kB
- Largest image under 150 kB
- Lighthouse Performance score 90 or higher

These are targets, not measured results. Do not report them as achieved until
your actual measurements confirm them.