import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { RestaurantService } from 'src/app/services/restaurants/restaurant.service';

@Component({
  selector: 'app-signin',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;



  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private authService: AuthService,

 
  ) {
    this.signInForm = this.formBuilder.group({
      userId: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.signInForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

 
  }

  // Handle Google sign-in
  signInWithGoogle() {
    this.authService.signInWithGoogle().then(
      (result: firebase.auth.UserCredential) => {
        console.log('Signed in with Google');

        // Extract Google user data safely, with fallback for null values
        const user = result.user;
        if (user) {
          const userId = user.uid;
          const name = user.displayName || 'Anonymous';  // Handle null case
          const email = user.email || '';  // Handle null case

          // Post user data to Firestore
          this.authService.addUserToFirestore(userId, name, email).then(() => {
            console.log('User data stored in Firestore');
            this.router.navigate(['/dashboard']);  // Navigate to dashboard or homepage
          }).catch((error: any) => {
            console.error('Error storing user data', error);
          });
        }
      },
      (error: any) => {
        console.error('Google sign-in error', error);
      }
    );
  }

  
}
