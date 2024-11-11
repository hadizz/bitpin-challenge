import { KeyboardArrowDown, Wifi } from '@mui/icons-material';
import { IconButton, Paper, Slide, Tooltip } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { StatusDot } from './StatusDot';

interface ServiceStatusFooterProps {
  buyOrders: UseQueryResult;
  sellOrders: UseQueryResult;
  trades: UseQueryResult;
}

export function ServiceStatusFooter({ buyOrders, sellOrders, trades }: ServiceStatusFooterProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div
        className={twMerge(
          'absolute transition-all duration-100',
          isOpen ? 'bottom-6 left-1' : 'bottom-2 left-1'
        )}
      >
        <IconButton onClick={() => setIsOpen(!isOpen)} className="!bg-white shadow-lg" size="small">
          {isOpen ? <KeyboardArrowDown /> : <Wifi />}
        </IconButton>
      </div>

      <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
        <Paper elevation={3} className="p-3 bg-white border-t">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Tooltip
                title={
                  <div className="flex gap-2 p-1">
                    <div className="flex items-center gap-1 text-xs">
                      <StatusDot type="refreshing" name="Refreshing" />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <StatusDot type="updated" name="Updated" />
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <StatusDot type="failed" name="Failed" />
                    </div>
                  </div>
                }
                placement="top"
              >
                <span className="text-sm font-medium">Service Status</span>
              </Tooltip>

              <div className="flex gap-4">
                <StatusDot
                  type={
                    buyOrders.isFetching ? 'refreshing' : buyOrders.isSuccess ? 'updated' : 'failed'
                  }
                  name="Buy Orders"
                />
                <StatusDot
                  type={
                    sellOrders.isFetching
                      ? 'refreshing'
                      : sellOrders.isSuccess
                        ? 'updated'
                        : 'failed'
                  }
                  name="Sell Orders"
                />
                <StatusDot
                  type={trades.isFetching ? 'refreshing' : trades.isSuccess ? 'updated' : 'failed'}
                  name="Trades"
                />
              </div>
            </div>
          </div>
        </Paper>
      </Slide>
    </div>
  );
}
