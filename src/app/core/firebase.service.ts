import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Customer } from '../shared/models/customerModel';
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
    this.afs.collection('Customer/'+customerId+'/Debt').doc(debt.id).delete();
    console.log('debt deleted')
  }

  getAllPaid(id:string){
    return this.afs.collection('Customer/'+id+'/Paid').snapshotChanges();
  }
}
