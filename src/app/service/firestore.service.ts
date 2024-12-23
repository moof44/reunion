// firestore.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { Registration } from '../model/global.model';

@Injectable({
  providedIn: 'root', // Make it a singleton service
})
export class FirestoreService {
  #firestore = inject(Firestore);
  registration: Observable<Registration[]>;

  constructor(){
    const registrationCollection = collection(
      this.#firestore,
      'registrations'
    );
    this.registration = collectionData(registrationCollection) as Observable<Registration[]>
  }

  async addRegistration(data: Registration) {
    const registrationCollection = collection(this.#firestore, 'registrations');
    return addDoc(registrationCollection, data);
  }
}