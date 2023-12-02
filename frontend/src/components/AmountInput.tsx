import { Button, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { createPaymentRequest } from '../utils';

export const AmountInput = ({ name, control, ...props }: any) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <NumberInput
          {...props}
          value={field.value}
          onChange={(valueString) => field.onChange(Number(valueString))}
          outline
          variant="outline"
        >
          <NumberInputField {...field} />
        </NumberInput>
      )}
    />
  );
};

export const AmountInputForm = () => {
  const { handleSubmit, register, control } = useForm();

  const onSubmit = async (data: any) => {
    const response = await createPaymentRequest(data);
    console.log('response', response);
    window.location.href = response.url;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AmountInput {...register('amount')} control={control} />
      <Button marginTop={10} bgColor="peru" type="submit">
        Submit
      </Button>
    </form>
  );
};
