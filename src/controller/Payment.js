const PaymentModel = require('../model/Payment').Payment;
const { getRepository } = require("typeorm");
const generatePdf = async (comprovante ,data) => {
    const pdfkit = require('pdfkit');
    const pdfDocument = new pdfkit;
    const fs = require('fs');
    pdfDocument.pipe(fs.createWriteStream("Comprovante.pdf"));
    doc.image('image.png', {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });
    pdfDocument.text(`${comprovante}
    ---------------------------------------
    ${data}`).fontSize(25);
    pdfDocument.end();
}

const getPayments = async (request) => {
    console.log(request);
    const { client } = request.headers;

    const payments = await PaymentModel.find(
        {
            where:
            {
                client
            }
        }
    );
    return payments;
};

const makePayments = async (request) => {
    const { client, amount, receiver, tax, transactionDate } = request.payload;

    const payment = new PaymentModel();
    payment.client = client;
    payment.amount = Number(amount);
    payment.receiver = receiver;
    payment.tax = Number(tax);
    payment.transactionDate = transactionDate;

    const repository = getRepository(PaymentModel);
    repository.save(payment);

    const response = await generatePdf('COMPROVANTE DE TRANSAÇÃO', payment);
    
    return response;
};

const updatePayments = async (request) => {
    const { id, client, amount, receiver, tax } = request.payload;

    const payment = PaymentModel.find(
        {
            where:
            {
                id
            }
        }
    );

    payment.client = client;
    payment.amount = Number(amount);
    payment.receiver = receiver;
    payment.tax = Number(tax);
    payment.save();

    const response = await generatePdf('COMPROVANTE DE ALTERAÇÃO', payment);
    
    return response;
};

const deletePayments = async (request) => {
    const { id } = request.payload;
    const payment = await PaymentModel.findOneOrFail({ id });
    payment.delete();

    const response = await generatePdf('COMPROVANTE DE ESTORNO', payment);
    
    return response;
};

module.exports = {
    getPayments,
    makePayments,
    updatePayments,
    deletePayments,
}   