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
  debtDate: Date;
  products: string;
}

export interface Paid {
  paymentId: string;
  paymentDate: Date;
  debtPrice: number;
  debtDate: Date;
  products: string;
}

export interface Table {
  value: string;
  viewValue: string;
}

export interface Income {
  category: string;
  incomeType: boolean;
  subCategory?: string[];
}

export interface componentProp{
    componentName:string,
    menuTitle:string,
    isLoginVisible:boolean,
    isRegisterVisible:boolean,
    isMenuVisible:boolean
}

export class PersonelData{
    email:string=''
    password:string=''
}
export class ContactRequest{
    personelData:PersonelData
    requestType:any=''
    tet:string=''
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
