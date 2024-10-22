import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from '../../models/reservation.model';
import { Table } from 'src/app/models/table.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservationsCollection: AngularFirestoreCollection<Reservation>; 

  constructor(private firestore: AngularFirestore) {
    this.reservationsCollection = firestore.collection<Reservation>('reservations');
  }

  // Get all reservations
  getReservations(): Observable<Reservation[]> {
    return this.reservationsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Omit<Reservation, 'reservationId'>;
        const reservationId = a.payload.doc.id;
        return { reservationId, ...data };
      }))
    );
  }

  // Get reservation by ID
  getReservationById(reservationId: string): Observable<Reservation | undefined> {
    return this.reservationsCollection.doc<Reservation>(reservationId).valueChanges();
  }

  // Create a new reservation
  createReservation(reservation: Omit<Reservation, 'reservationId'>): Promise<void> {
    const reservationId = this.firestore.createId(); // Generate a new ID
    const newReservation: Reservation = { reservationId, ...reservation }; // Create the full reservation object
    return this.firestore.collection('reservations').doc(reservationId).set(newReservation); // Use set to include the ID
  }

  // Update an existing reservation
  updateReservation(reservationId: string, reservation: Partial<Reservation>): Promise<void> {
    return this.reservationsCollection.doc(reservationId).update(reservation);
  }

  // Delete a reservation
  deleteReservation(reservationId: string): Promise<void> {
    return this.reservationsCollection.doc(reservationId).delete();
  }

  
  getTables():Promise<Table[]>{
    return firstValueFrom(
      this.firestore.collection<Table>('tables').valueChanges()
    )
  }
}
