import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GitHubIcon from '@mui/icons-material/GitHub';
import { AppBar, Box, Container, IconButton, Toolbar, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <AppBar position="sticky" color="default" elevation={0} className="border-b">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="h-16">
          <Box className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-4">
              {!isHome && (
                <Link to="/" className="text-inherit">
                  <IconButton size="small" color="inherit">
                    <ArrowBackIcon />
                  </IconButton>
                </Link>
              )}

              <Link to="/" className="flex items-center gap-2 text-inherit no-underline">
                <img src="/logo.svg" alt="BitTrade" className="h-8 w-8" />
                <span className="text-xl font-semibold">BitTrade</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title="View on GitHub">
                <IconButton
                  href="https://github.com/hadizz/bitpin-challenge"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
