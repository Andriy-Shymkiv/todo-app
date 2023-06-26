import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { StyledAuthInputErrorMessage } from '../Form/AuthForm';

interface EmailInputProps {
  // TODO: define types
  control: any;
  errors: any;
}

export const EmailInput: React.FC<EmailInputProps> = ({ control, errors }): JSX.Element => {
  return (
    <FormControl fullWidth>
      <Controller
        name='email'
        control={control}
        rules={{ required: true }}
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            autoComplete='email'
            label='Email'
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            error={Boolean(errors.email)}
            placeholder='example@com'
          />
        )}
      />
      {errors.email && <StyledAuthInputErrorMessage>{errors.email.message}</StyledAuthInputErrorMessage>}
    </FormControl>
  );
};
