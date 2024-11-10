import { DataGridProps, DataGrid as MUIDataGrid } from '@mui/x-data-grid';

const DataGrid = (props: DataGridProps) => {
  return <MUIDataGrid {...props} />;
};

export default DataGrid;
