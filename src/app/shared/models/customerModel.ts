export interface Customer
    {
        customerId?:number,
        name:string,
        surname:string,
        adres?:string,
        phone?:string,
        totalDept:number,       
    }

    // loan:[
    //     {
    //         loanId:number,
    //         price:number,
    //         products:string,
    //         date:Date

    //     },
       
        
    // ],
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