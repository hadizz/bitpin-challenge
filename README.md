# Bitpin Challenge / BitTrade

## Run on local

```bash
npm run dev
```

Note: to fixing cors error I've added api route in vercel serverless functions. to run on your local you need to call `https://bitpin-challenge.vercel.app` which is already configed on code.

steps of task implementataion:

## Choose UI library: `MUI` or `antd`

Bundle Size Comparison

`Material-UI (MUI)`

- Core package (@mui/material): ~300KB (minified + gzipped)
- Emotion dependencies: ~15KB

`Ant Design (antd)`

- Core package: ~600KB (minified + gzipped)
- Icons package: ~200KB
- Moment.js dependency (optional): ~230KB

Features:

- `MUI` has better table component rather than antd.
- built-in dark mode and light mode config with the help of createTheme.
- reach and various features for the future developing.
- easy implemntaion and better docs with biolerpaltes.

-> `MUI` wins!

## Service request handling: `axios` or `react-query`

> list need to update each 3 seconds

`react-query`

- Automatic periodic refetching (3-second requirement)
- Built-in loading and error states
- Automatic caching of market data
- Easy data synchronization across components
- Reduced boilerplate code
- Better performance with automatic background updates

-> `react-query` wins!

todo list:

- [x] cors
- [x] detail page summary
- [x] change service from ir to org if network error
- [x] dark theme
- [x] search utility for list page
- [x] swipe for changing tabs
