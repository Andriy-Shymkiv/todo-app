import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { StyledAuthInputErrorMessage } from '../Form/AuthForm';

interface NameInputProps {
  control: any;
  errors: any;
}

export const NameInput: React.FC<NameInputProps> = ({ control, errors }): JSX.Element => {
  return (
    <FormControl fullWidth>
      <Controller
        name='name'
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }): JSX.Element => (
          <TextField
            label='Name'
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={Boolean(errors.name)}
            placeholder='your name'
          />
        )}
      />
      {errors.name && <StyledAuthInputErrorMessage>{errors.name.message}</StyledAuthInputErrorMessage>}
    </FormControl>
  );
};
