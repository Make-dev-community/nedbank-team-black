import { Heading, Spinner } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const finalizePaymentRequest = async (params: any): Promise<any> => {
  // params.orderNumber -> to store on file
  return Promise.resolve(true);
};

export const FinalizePayment = () => {
  const query: any = useQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = {
      orderNumber: query.state,
      code: query.code,
    };

    finalizePaymentRequest(params);
  }, [query.code, query.state]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);

  return isLoading ? (
    <div>
      <h1>Finalizing Payment</h1>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </div>
  ) : (
    <div>
      <Heading>Payment Successful!</Heading>
    </div>
  );
};
