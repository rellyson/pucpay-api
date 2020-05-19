const Routes = require('hapi').Router;

module.exports = { 
    
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

module.exports= {
    Router;
}