'use client';
import { useState } from 'react';
import QRCode from 'react-qr-code';
import Modal from '@mui/material/Modal';

const requestLightToken = () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("client_id", "c39c9307-b0c7-41bf-9e7e-c275db327858");
  urlencoded.append(
    "client_secret",
    "T6dH7gH3wJ6aX1iY2iB7uD6wU5hT7cH1gN6xB7rL8wL3yF1gM5"
  );
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("scope", "payments");

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch(
    "https://api.nedbank.co.za/apimarket/sandbox/nboauth/oauth20/token",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const createPaymentIntent = (params: any) => {
  const { token, amount } = params;

  const randomValues = {
    "x-idempotency-key": Math.floor(Math.random() * 1000000),
    orderNumber: "20231202-" + Math.floor(Math.random() * 1000000),
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("x-fapi-financial-id", "OB/2017/001");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("x-idempotency-key", `${randomValues["x-idempotency-key"]}`);
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("x-ibm-client-id", "c39c9307-b0c7-41bf-9e7e-c275db327858");
  myHeaders.append(
    "x-ibm-client-secret",
    "T6dH7gH3wJ6aX1iY2iB7uD6wU5hT7cH1gN6xB7rL8wL3yF1gM5"
  );

  const raw = JSON.stringify({
    Data: {
      ReadRefundAccount: "Yes",
      Initiation: {
        InstructionIdentification: `${randomValues.orderNumber}`,
        EndToEndIdentification: "def123",
        InstructedAmount: {
          Amount: `${amount}`,
          Currency: "ZAR",
        },
        CreditorAccount: {
          SchemeName: "SortCodeAccountNumber",
          Identification: "1987651009427726",
          Name: "ACME Inc",
          SecondaryIdentification: "1009427726",
        },
        RemittanceInformation: {
          Unstructured: "Maintenance Fee",
          Reference: "FRESCO-101",
        },
      },
    },
    Risk: {
      PaymentContextCode: "EcommerceMerchantInitiatedPayment",
      ContractPresentInidicator: false,
      PaymentPurposeCode: "EPAY",
      BeneficiaryPrepopulatedIndicator: false,
      BeneficiaryAccountType: "Business",
      MerchantCustomerIdentification: "1234567891",
      DeliveryAddress: {
        AddressLine: ["25 Queen Victoria Street", "Acacia Lodge"],
        StreetName: "Kromdraai Road",
        BuildingNumber: "25",
        PostCode: "7872",
        TownName: "Hout Bay",
        CountrySubDivision: "Gauteng",
        Country: "ZA",
      },
    },
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://api.nedbank.co.za/apimarket/sandbox/open-banking/v3.1/pisp/domestic-payment-consents",
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};

const createPaymentRequest = async (params: any) => {
  return requestLightToken().then((response) => {
    const createPaymentIntentParams = {
      token: response.access_token,
      amount: params.amount,
    };

    return createPaymentIntent(createPaymentIntentParams).then((response) => {
      return {
        url: response.Links.SCARedirectURL,
      };
    });
  });
};

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function Home() {
	const [url, setUrl] = useState('');
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const payNow = () => {
		const params = {
			amount: 135,
		};

		createPaymentRequest(params).then((response) => {
			setUrl(response.url);
			setOpen(true);
		});
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div
					style={{
						display: 'flex',
						alignContent: 'center',
						height: '100vh',
						justifyContent: 'center',
					}}
				>
					<QRCode
						size={256}
						style={{
							height: 'auto',
							maxWidth: '250px',
							width: '250px',
						}}
						value={url}
						viewBox={`0 0 256 256`}
					/>
				</div>
			</Modal>
			<section className="container px-4 mx-auto">
				<div className="flex items-center gap-x-3">
					<span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
						5 Items
					</span>
				</div>

				<div className="flex flex-col mt-6">
					<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
								<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
									<thead className="bg-gray-50 dark:bg-gray-800">
										<tr>
											<th
												scope="col"
												className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>
												<div className="flex items-center gap-x-3">
													<input
														type="checkbox"
														className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
													/>
													<span>
														Item description
													</span>
												</div>
											</th>

											<th
												scope="col"
												className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>
												<button className="flex items-center gap-x-2">
													<span> Price </span>

													<svg
														className="h-3"
														viewBox="0 0 10 11"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
															fill="currentColor"
															stroke="currentColor"
															stroke-width="0.1"
														/>
														<path
															d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
															fill="currentColor"
															stroke="currentColor"
															stroke-width="0.1"
														/>
														<path
															d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
															fill="currentColor"
															stroke="currentColor"
															stroke-width="0.3"
														/>
													</svg>
												</button>
											</th>

											<th
												scope="col"
												className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>
												<button className="flex items-center gap-x-2">
													<span>Quantity</span>

													{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                        </svg> */}
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Email address
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-200"
                      ></th>

                      <th scope="col" className="relative py-3.5 px-4">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">

                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                Sasko bread
                              </h2>
                              {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">@authurmelo</p> */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> */}

                          <h2 className="text-sm font-normal text-emerald-500">
                            R 40
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        x1
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        authurmelo@example.com
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {/* <div className="flex items-center gap-x-2">
                                        <p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">Design</p>
                                        <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">Product</p>
                                        <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">Marketing</p>
                                    </div> */}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                          {/* 
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button> */}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">

                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                Biltong
                              </h2>
                              {/* <p className="text-sm font-normal text-gray-600 dark:text-gray-400">@ameliaanderson</p> */}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          {/* <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> */}

                          <h2 className="text-sm font-normal text-emerald-500">
                            R23
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        x1
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ameliaanderson@example.com
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {/* <div className="flex items-center gap-x-2">
                                        <p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">Design</p>
                                        <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">Product</p>
                                        <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">Marketing</p>
                                    </div> */}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>

                          {/* <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </button> */}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">

                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                Soda
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <h2 className="text-sm font-normal text-emerald-500">
                            R 30
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        x3
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        junior@example.com
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap"></td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">

                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                Chips
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <h2 className="text-sm font-normal text-emerald-500">
                            R 32
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        x1
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        oliviawathan@example.com
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap"></td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />

                          <div className="flex items-center gap-x-2">
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                Salt
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <h2 className="text-sm font-normal text-emerald-500">
                            R 10
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        x1
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        mia@example.com
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap"></td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => payNow()}
            className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Button
          </button>
        </div>
      </section>
    </>
  );
}
