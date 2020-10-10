export interface Customer {
  customerId?: number;
  name: string;
  surname: string;
  adres?: string;
  phone?: string;
  totalDept: number;
}

export interface Debt {
  debtPrice: number;
  debtDate: string;
  products: string;
}

export interface Paid {
  paymentId: number;
  paymentDate: Date;
  paymentPrice: number;
}

export interface Table {
    value: string;
    viewValue: string;
  }

// payment:[
//     {
//         paymentId:number,
//         date:Date,
//         price :number,
//         deletedLoan:[
//             {
//                 LoanId:number,
//                 price:string,
//                 products:string
//                 date:Date,
//             }
//         ]
//     }
// ]
