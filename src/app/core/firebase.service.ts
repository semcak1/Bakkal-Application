import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Customer, Paid } from '../shared/models/customerModel';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private itemDoc:AngularFirestoreDocument<any>
  customers:Observable<any[]>
  private customerCollection:AngularFirestoreCollection<Customer>
  debtCollection:AngularFirestoreCollection<any>
  constructor(private afs:AngularFirestore) {
    
    
  }

  getCollectionUrl(collection){
    return `${collection}`
  }

  //CUSTOMERS ACTİONS//

  getDocuments(collection:string,filter?:any){
    //firebase den verileri sıralı olarak alma
    this.customerCollection=this.afs.collection<Customer>(collection,ref=>ref.orderBy("customerId","asc"));   
    return this.customerCollection.snapshotChanges();
  }

  addCustomer(customer){
    this.afs.collection<Customer>('Customer').add(customer)
    console.log('customer added')
  }
  
  deleteCustomer(collection,id:string){
    this.afs.doc(collection+'/'+id).delete();
    console.log('customer deleted')
  }

  updateCustomer(id:string,data:Customer){
    this.afs.collection('Customer').doc(id).update(data)
  }

  getAllDebt(id:string){
    this.debtCollection=this.afs.collection('Customer/'+id+'/Debt');
    return this.debtCollection.snapshotChanges();
  }

  addDebt(debt,id:string){
    this.afs.collection('Customer/'+id+'/Debt').add(debt)
    console.log('debt aded !')
  }
  
  addToPaid(customerId:string,debt){
    this.afs.collection('Customer/'+customerId+'/Paid').add(debt);
    console.log('add to paid')
  }

  deleteDebt(customerId:string,debt){
    this.afs.collection('Customer/'+customerId+'/Debt').doc(debt.debtId).delete();
    console.log('debt deleted')
  }
  updateDebt(customerId:string,debtId:string,data){
    this.afs.collection('Customer/'+customerId+'/Debt').doc(debtId).update(data)
  }

  getAllPaid(id:string){
    return this.afs.collection<Paid>('Customer/'+id+'/Paid').snapshotChanges();
  }

    //INCOME ACTİONS//


    // Category Actions
    getIncomesCategory(){
      this.debtCollection=this.afs.collection('Income');
      return this.debtCollection.snapshotChanges();
    }

    addIncome(income,id:string){
      this.afs.collection('Customer/'+id+'/IncomeExpense').add(income)
      console.log('income aded !')
    }

    getAllIncomes(id:string){
      this.debtCollection=this.afs.collection('Income/'+id+'/IncomeExpense');
      return this.debtCollection.snapshotChanges();
    }

    addCategory(data){
      this.afs.collection('Income').add(data)
    }

    deleteCategory(id:string){
      this.afs.collection('Income').doc(id).delete()
    }

    updateCategory(id:string,data){
      this.afs.collection('Income').doc(id).update(data)
    }

    //Sub Category Actions

    getSubCategory(id:string){
      this.afs.collection(id,)
    }

    addIncomeExpense(id:string,subCategory:string,data){
      this.afs.collection('Income/'+id+'/'+subCategory).add(data)
    }

    getIncomeExpense(id:string,subCategory:string){
      return this.afs.collection('Income/'+id+'/'+subCategory).snapshotChanges();
    }
}
