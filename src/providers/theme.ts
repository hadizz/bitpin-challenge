import '@/providers/theme-types';
import { PaletteMode, alpha } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            borderBottom: `1px solid ${mode === 'light' ? '#e0e0e0' : '#333333'}`,
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          '.MuiDataGrid-root': {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1e1e1e',
            borderColor: mode === 'light' ? '#e0e0e0' : '#333333',
            '& .MuiDataGrid-cell': {
              borderColor: mode === 'light' ? '#e0e0e0' : '#333333',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: mode === 'light' ? alpha('#000', 0.02) : alpha('#fff', 0.02),
              borderColor: mode === 'light' ? '#e0e0e0' : '#333333',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: mode === 'light' ? alpha('#000', 0.04) : alpha('#fff', 0.04),
            },
          },
        },
      },
    },
  });
};
