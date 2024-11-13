import { useTheme } from '@/contexts/ThemeContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar position="sticky" color="default" elevation={0} className="border-b !h-[40px]">
      <Container maxWidth="xl" className="!h-[40px]">
        <Toolbar disableGutters className="!min-h-[40px]">
          <Box className="flex items-center justify-between w-full gap-2">
            <div className="flex items-center gap-2">
              {!isHome && (
                <Link to="/" className="text-inherit">
                  <IconButton size="small" color="inherit">
                    <ArrowBackIcon fontSize="small" />
                  </IconButton>
                </Link>
              )}

              <Link to="/" className="flex items-center gap-1 text-inherit no-underline">
                <img src="/logo.svg" alt="BitTrade" className="h-6 w-6" />
                <span className="text-sm font-semibold">BitTrade</span>
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <Tooltip title="View on GitHub">
                <IconButton
                  href="https://github.com/hadizz/bitpin-challenge"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <IconButton onClick={toggleTheme} color="inherit" size="small">
                {mode === 'dark' ? (
                  <Brightness7Icon fontSize="small" />
                ) : (
                  <Brightness4Icon fontSize="small" />
                )}
              </IconButton>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
