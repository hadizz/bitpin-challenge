import '@mui/material/styles';
import { DataGridProps } from '@mui/x-data-grid';

declare module '@mui/material/styles' {
  interface ComponentNameToClassKey {
    MuiDataGrid: DataGridProps;
  }

  interface Components {
    MuiDataGrid?: {
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
  }
}
