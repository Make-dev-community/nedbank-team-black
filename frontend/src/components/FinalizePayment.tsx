import { useEffect, useMemo } from 'react';
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

  const params = {
    orderNumber: query.state,
    code: query.code,
  };
  useEffect(() => {
    finalizePaymentRequest(params);
  });

  // finalizePaymentRequest(params)
  //     .then((data) => {
  //         res.send(mapSuccessResponse(data, 200));
  //     })
  //     .catch((error: CustomError) => {
  //         return res.status(error.statusCode).send(mapFailureResponse(error));
  //     });
  return (
    <div>
      <h1>Finalizing Payment</h1>
    </div>
  );
};
