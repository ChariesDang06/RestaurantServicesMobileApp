import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import firebase from 'firebase/compat/app';

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

        const user = result.user;
        if (user) {
          const userId = user.uid;
          const name = user.displayName || 'Anonymous';
          const email = user.email || '';

          // Post user data to Firestore
          this.authService.addUserToFirestore(userId, name, email).then(() => {
            console.log('User data stored in Firestore');
            this.router.navigate(['/home']);
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

  // Handle Facebook sign-in
  // Handle Facebook sign-in
signInWithFacebook() {
  this.authService.signInWithFacebook().then(
    (result: firebase.auth.UserCredential) => {
      console.log('Signed in with Facebook');

      const user = result.user;
      if (user) {
        const userId = user.uid;
        const name = user.displayName || 'Anonymous';
        const email = user.email || '';
        const phone = user.phoneNumber || '';  // Get phone number if available

        // Post user data to Firestore
        this.authService.addUserToFirestore(userId, name, email, phone).then(() => {
          console.log('User data stored in Firestore');
          this.router.navigate(['/home']);  // Redirect to homepage
        }).catch((error: any) => {
          console.error('Error storing user data', error);
        });
      }
    },
    (error: any) => {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn('Popup was closed by the user before completing sign-in.');
        this.showAlert('Sign-in was canceled. Please try again.');
      } else {
        console.error('Facebook sign-in error', error);
        this.showAlert('Something went wrong with Facebook sign-in. Please try again later.');
      }
    }
  );
}

// Show an alert message
async showAlert(message: string) {
  const alert = await this.alertController.create({
    header: 'Login Error',
    message,
    buttons: ['OK'],
  });

  await alert.present();
}

}
