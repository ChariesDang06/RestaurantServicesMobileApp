import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservations/reservation.service';

@Component({
  selector: 'app-data-test',
  templateUrl: './data-test.page.html',
  styleUrls: ['./data-test.page.scss'],
})
export class DataTestPage implements OnInit {
  reservations: Reservation[] = [];
  ReservationId: string = ''; // Store the Reservation ID for testing
  newReservation: Omit<Reservation, 'ReservationId'> = {
  reservationId: '',
  userId: '',
  tableId: '',
  reservationTime: '',
  numberOfPeople: 0,
  preOrderedItems: [],
  status: '',
  depositAmount: 0,
  confirmationEmailSent: false,
  confirmationSMS: false,
  };
  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getAllReservations();
  }
  getAllReservations() {
    this.reservationService.getReservations().subscribe(data => {
      this.reservations = data;
      console.log('All Reservations:', this.reservations);
    });
  }

  getReservationById() {
    this.reservationService.getReservationById(this.ReservationId).subscribe(data => {
      console.log('Reservation by ID:', data);
    });
  }

  createReservation() {
    this.reservationService.createReservation(this.newReservation).then(() => {
      console.log('Reservation created');
      this.getAllReservations(); // Refresh the list after creating
    });
  }

  updateReservation() {
    if (this.ReservationId) {
      const updatedData = { tableId: 'Updated table id', numberOfPeople: 0 }; // Modify as needed
      this.reservationService.updateReservation(this.ReservationId, updatedData).then(() => {
        console.log('Reservation updated');
        this.getAllReservations(); // Refresh the list after updating
      });
    }
  }

  deleteReservation() {
    if (this.ReservationId) {
      this.reservationService.deleteReservation(this.ReservationId).then(() => {
        console.log('Reservation deleted');
        this.getAllReservations(); // Refresh the list after deletion
      });
    }
  }
}
