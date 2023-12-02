const fs = require('fs');

function generateTransaction() {
    const accountId = "306c3686-5c25-47a9-bc58-8c86a2f6522a";
    const transactionId = uuidv4();
    const transactionReference = generateRandomString(20);
    const amount = {
        "Amount": getRandomAmount(),
        "Currency": "ZAR"
    };
    const creditDebitIndicator = Math.random() < 0.5 ? "Credit" : "Debit";
    const status = "Booked";
    const bookingDateTime = "Invalid date";
    const transactionInformation = generateRandomString(30);
    const bankTransactionCode = {
        "Code": getRandomBankTransactionCode()
    };
    const proprietaryBankTransactionCode = {
        "Code": getRandomBankTransactionCode()
    };
    const balance = {
        "Amount": {
            "Amount": getRandomAmount(),
            "Currency": "ZAR"
        },
        "CreditDebitIndicator": "Credit",
        "Type": "InterimAvailable"
    };

    return {
        "AccountId": accountId,
        "TransactionId": transactionId,
        "TransactionReference": transactionReference,
        "Amount": amount,
        "CreditDebitIndicator": creditDebitIndicator,
        "Status": status,
        "BookingDateTime": bookingDateTime,
        "TransactionInformation": transactionInformation,
        "BankTransactionCode": bankTransactionCode,
        "ProprietaryBankTransactionCode": proprietaryBankTransactionCode,
        "Balance": balance
    };
}

function getRandomAmount() {
    return Math.random() * 10000 + 1; // Random amount between 1 and 10000
}

function getRandomBankTransactionCode() {
    return Math.floor(Math.random() * 100) + 1; // Random code between 1 and 100
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

const transactions = [];

for (let i = 0; i < 3000; i++) {
    transactions.push(generateTransaction());
}

const filePath = 'transactions.json';

fs.writeFile(filePath, JSON.stringify(transactions, null, 2), 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Transactions have been written to', filePath);
    }
});
