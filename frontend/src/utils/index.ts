const requestToken = () => {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const urlencoded = new URLSearchParams();
    urlencoded.append('client_id', 'c39c9307-b0c7-41bf-9e7e-c275db327858');
    urlencoded.append(
        'client_secret',
        'T6dH7gH3wJ6aX1iY2iB7uD6wU5hT7cH1gN6xB7rL8wL3yF1gM5'
    );
    urlencoded.append('grant_type', 'client_credentials');
    urlencoded.append('scope', 'payments');
    const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow',
    };
    return fetch(
        'https://api.nedbank.co.za/apimarket/sandbox/nboauth/oauth20/token',
        requestOptions
    )
        .then((response) => response.json())
        .catch((error) => console.log('error', error));
};

const createPaymentIntent = (params: any) => {
    const { token, amount } = params;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-fapi-financial-id', 'OB/2017/001');
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('x-idempotency-key', `${Math.floor(Math.random() * 1000000) }`);
    myHeaders.append('Authorization', `Bearer ${token}`);
    myHeaders.append('x-ibm-client-id', 'c39c9307-b0c7-41bf-9e7e-c275db327858');
    myHeaders.append(
        'x-ibm-client-secret',
        'T6dH7gH3wJ6aX1iY2iB7uD6wU5hT7cH1gN6xB7rL8wL3yF1gM5'
    );
    const raw = JSON.stringify({
        Data: {
            ReadRefundAccount: 'Yes',
            Initiation: {
                InstructionIdentification: 'abc112',
                EndToEndIdentification: 'def123',
                InstructedAmount: {
                    Amount: `${amount}`,
                    Currency: 'ZAR',
                },
                CreditorAccount: {
                    SchemeName: 'SortCodeAccountNumber',
                    Identification: '1987651009427726',
                    Name: 'ACME Inc',
                    SecondaryIdentification: '1009427726',
                },
                RemittanceInformation: {
                    Unstructured: 'Maintenance Fee',
                    Reference: 'FRESCO-101',
                },
            },
        },
        Risk: {
            PaymentContextCode: 'EcommerceMerchantInitiatedPayment',
            ContractPresentInidicator: false,
            PaymentPurposeCode: 'EPAY',
            BeneficiaryPrepopulatedIndicator: false,
            BeneficiaryAccountType: 'Business',
            MerchantCustomerIdentification: '1234567891',
            DeliveryAddress: {
                AddressLine: ['25 Queen Victoria Street', 'Acacia Lodge'],
                StreetName: 'Kromdraai Road',
                BuildingNumber: '25',
                PostCode: '7872',
                TownName: 'Hout Bay',
                CountrySubDivision: 'Gauteng',
                Country: 'ZA',
            },
        },
    });
    const requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };
    return fetch(
        'https://api.nedbank.co.za/apimarket/sandbox/open-banking/v3.1/pisp/domestic-payment-consents',
        requestOptions
    )
        .then((response) => response.json())
        .catch((error) => console.log('error', error));
};

const createPaymentRequest = async (params: any): Promise<any> => {
    return requestToken().then((response: any) => {
        const createPaymentIntentParams = {
            token: response.access_token,
            amount: params.amount
        };
        return createPaymentIntent(createPaymentIntentParams)
            .then((response) => {
                return {
                    url: response.Links.SCARedirectURL
                    // url: response
                    // url: Math.floor(Math.random() * 1000000)
                }
            }).catch((e) => {
                console.log('----')
                console.log(e)
                console.log('----')
                return e
            });
    });
}

export {
    createPaymentRequest,
    createPaymentIntent,
    requestToken
}