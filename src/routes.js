const Payment = require('./controller/Payment');

module.exports = [
  
    {
      method: "GET",
      path: "/getPayments",
      options: {
        handler: Payment.getPayments
      }
    },
    {
      method: "POST",
      path: "/makePayments",
      options: {
        handler: Payment.makePayments
      }
    },
    {
      method: "PUT",
      path: "/updatePayments",
      options: {
        handler: Payment.updatePayments
      }
    },
    {
      method: "DELETE",
      path: "/deletePayments",
      options: {
        handler: Payment.deletePayments
      }
    }
  ];