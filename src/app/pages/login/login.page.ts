import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { User } from '../../models/user.model';  // Import the User model
import { UserService } from 'src/app/services/users/user.service';
import * as bcrypt from 'bcryptjs'; 
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
    private authService: AuthService,
     private userService: UserService
  ) {
    this.signInForm = this.formBuilder.group({
       userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
// Handle login on button click
async onLogin() {
  const userNameOrPhone = this.signInForm.value.userName; // This will be either the username or phone
  const password = this.signInForm.value.password;

  // Check if the username or phone exists in Firestore
  this.userService.getUserByUserNameOrPhone(userNameOrPhone).subscribe(async (user) => {
    if (user) {
      // Compare the provided password with the hashed password in the database
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        // If the password matches, store the user ID in local storage using AuthService
        this.authService.storeUserId(user.userId);
        console.log(user.userId);

        // Navigate to the home page after successful login
        this.router.navigate(['/home']);
      } else {
        // Show an error message if the password does not match
        this.showAlert('Mật khẩu không đúng. Vui lòng thử lại.');
      }
    } else {
      // Show an error message if the username or phone number does not exist
      this.showAlert('Tên đăng nhập hoặc số điện thoại không tồn tại.');
    }
  });
}


  // Handle Google sign-in
  signInWithGoogle() {
    this.authService.signInWithGoogle().then(
      async (result: firebase.auth.UserCredential) => {
        const user = result.user;
        if (user) {
          const userId = user.uid;
          const name = user.displayName || 'Anonymous';
          const email = user.email || '';

          // Create a User object based on the sign-in result
          const userData: User = {
            userId,
            name,
            email,
            phone: '', // No phone from Google sign-in, leave empty or fetch separately
            address: '' // Optionally add the address if available
            ,
            password: ''
          };

          // Call the onSubmit function from AuthService
          const success = await this.authService.onSubmit(userData);

          if (success) {
            console.log('User data stored in Firestore');
            this.router.navigate(['/home']);
          } else {
            this.showAlert('Error storing user data. Please try again later.');
          }
        }
      },
      (error: any) => {
        console.error('Google sign-in error', error);
      }
    );
  }

  // Handle Facebook sign-in
  signInWithFacebook() {
    this.authService.signInWithFacebook().then(
      async (result: firebase.auth.UserCredential) => {
        const user = result.user;
        if (user) {
          const userId = user.uid;
          const name = user.displayName || 'Anonymous';
          const email = user.email || '';
          const phone = user.phoneNumber || '';

          // Create a User object based on the sign-in result
          const userData: User = {
            userId,
            name,
            email,
            phone,
            address: '' // Optionally add the address if available
            ,
            password: ''
          };

          // Call the onSubmit function from AuthService
          const success = await this.authService.onSubmit(userData);

          if (success) {
            console.log('User data stored in Firestore');
            this.router.navigate(['/home']);
          } else {
            this.showAlert('Error storing user data. Please try again later.');
          }
        }
      },
      (error: any) => {
        if (error.code === 'auth/popup-closed-by-user') {
          this.showAlert('Sign-in was canceled. Please try again.');
        } else {
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
