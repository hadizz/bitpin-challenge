# Bitpin Challenge / BitTrade

steps of task implementataion:

## Choose UI library: `MUI` or `antd`

Bundle Size Comparison

`Material-UI (MUI)`

- Core package (@mui/material): ~300KB (minified + gzipped)
- Data grid (@mui/x-data-grid): ~93.5kb (minified + gzipped)
- Emotion dependencies: ~15KB

`Ant Design (antd)`

- Core package: ~600KB (minified + gzipped)
- Icons package: ~200KB
- Moment.js dependency (optional): ~230KB

Features:

- `MUI` has better table component rather than antd.
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

- [x] detail page summary
- [ ] change service from ir to org if network error
- [x] dark theme
- [ ] swipe for changing tabs
