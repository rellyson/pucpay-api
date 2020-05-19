const PaymentModel = require('../model/Payment').Payment;
const { getRepository } = require("typeorm");

const getPayments = async (request) => {
    const { client } = request.body;
    
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

const makePayments = async (request) =>{
    const {client, amount, receiver, tax, transactionDate} = request.payload;

    const payment = new PaymentModel();
    payment.client = client;
    payment.amount = Number(amount);
    payment.receiver = receiver;
    payment.tax = Number(tax);
    payment.transactionDate = transactionDate;

    const repository = getRepository(PaymentModel);
    repository.save(payment);

    return "Payment registrated succesfully!";
};

const updatePayments = async (request) =>{
    const {id, client, amount, receiver, tax} = request.payload;

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
    
    return "Payment updated succesfully!";
};

const deletePayments = async (request) =>{
  const {id} = request.payload;
  const payment = await PaymentModel.findOneOrFail({id});
  payment.delete();

  return "Object deleted";    
};

module.exports ={
    getPayments,
    makePayments,
    updatePayments,
    deletePayments,
}   