const EntitySchema = require("typeorm").EntitySchema;
const {BaseEntity} = require("typeorm");

class Payment extends BaseEntity{
    id
    client
    receiver
    amount
    tax
    transactionDate
}

const Schema = new EntitySchema({
    name: "payment",
    target: Payment,
    columns:{
        id: {
            primary: true,
            type: "int",
            generated:true
        },
        client: {
            type: "text"
        },
        receiver: {
            type: "text"
        },
        amount: {
            type: "float"
        },
        tax: {
            type: "float"
        },
        transactionDate: {
            type: "date"
        }
    }
});


module.exports ={
    Payment,
    Schema
}