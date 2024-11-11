import { TextField, TextFieldProps } from '@mui/material';

interface PercentageFieldProps extends Omit<TextFieldProps, 'onChange' | 'type'> {
  onChange: (value: number) => void;
}

export const PercentageField = ({ onChange, ...props }: PercentageFieldProps) => {
  return (
    <TextField
      type="number"
      onChange={(e) => {
        const value = Number(e.target.value);
        if (value >= 0 && value <= 100) {
          onChange(value);
        }
      }}
      {...props}
      size="small"
    />
  );
};
