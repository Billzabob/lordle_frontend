import * as React from 'react';
import { useReactiveVar } from '@apollo/client';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { statsDialogOpen } from '../reactive-vars';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent, useTheme } from '@mui/material';

export const StatsChartDialog = () => {
  const theme = useTheme();
  const open = useReactiveVar(statsDialogOpen);

  // Generate Sales Data
  function createData(time, amount) {
    return { time, amount };
  }

  const data = [
    createData('00:00', 0),
    createData('03:00', 300),
    createData('06:00', 600),
    createData('09:00', 800),
    createData('12:00', 1500),
    createData('15:00', 2000),
    createData('18:00', 2400),
    createData('21:00', 2400),
    createData('24:00', undefined),
  ];

  const handleClose = () => {
    statsDialogOpen(false);
  };

  return (
    <Dialog maxWidth="md" fullWidth onClose={handleClose} open={open} PaperProps={{ sx: { height: "50%" } }}>
      <DialogTitle textAlign="center">Stats</DialogTitle>
      <DialogContent>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis
              dataKey="time"
              stroke={theme?.palette?.text?.secondary}
              style={theme?.typography?.body2}
            />
            <YAxis
              stroke={theme?.palette?.text?.secondary}
              style={theme?.typography?.body2}
            >
              <Label
                angle={270}
                position="left"
                style={{
                  textAnchor: 'middle',
                  fill: theme?.palette?.text?.primary,
                  ...theme?.typography?.body1,
                }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="amount"
              stroke={theme?.palette?.primary?.main}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </DialogContent>
    </Dialog>
  );
}