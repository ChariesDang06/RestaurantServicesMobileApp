import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';
import firebase from 'firebase/compat/app';
import { User } from '../../models/user.model'; // Import the User model
import { UserService } from 'src/app/services/users/user.service';
import * as bcrypt from 'bcryptjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signin',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  
  // previousRoute: string='home';

  constructor(
    public formBuilder: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private navController: NavController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.signInForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    // const state = history.state;
    // if (state && state.previousRoute ) {
    //   this.previousRoute = state.previousRoute;
    //   console.log('prev route'+this.previousRoute)
    // }
    this.signInForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // Handle login on button click
  gotoSigin() {
    this.navController.navigateForward('/signin', {
      // state: {
      //   previousRoute: this.previousRoute,
      // },
    });
  }
  async login() {
    try {
      const user = await this.userService.getUserByUserName(this.signInForm.value.userName);
      if (user) {
        const passwordMatch = bcrypt.compareSync(this.signInForm.value.password, user.password);
        if (passwordMatch) {
          this.authService.storeUserId(user.userId);
          console.log(user.userId);
          this.signInForm.reset();

          // Navigate to the home page after successful login
          //this.navController.navigateForward([`/${this.previousRoute}`]);
          this.navController.navigateForward('/home');
        }
        else {
          // Show an error message if the password does not match
          this.showAlert('Mật khẩu không đúng. Vui lòng thử lại.');
        }
      }
      else {
        // Show an error message if the username or phone number does not exist
        this.showAlert('Tên đăng nhập hoặc số điện thoại không tồn tại.');
      }
    }
    catch (e) { console.log(e) }
  }
  // async onLogin() {
  //   const userNameOrPhone = this.signInForm.value.userName; // This will be either the username or phone
  //   const password = this.signInForm.value.password;

  //   // Check if the username or phone exists in Firestore
  //   this.userService
  //     .getUserByUserNameOrPhone(userNameOrPhone)
  //     .subscribe(async (user) => {
  //       if (user) {
  //         // Compare the provided password with the hashed password in the database
  //         const passwordMatch = bcrypt.compareSync(password, user.password);

  //         if (passwordMatch) {
  //           // If the password matches, store the user ID in local storage using AuthService
  //           this.authService.storeUserId(user.userId);
  //           console.log(user.userId);
  //           this.signInForm.reset();

  //           // Navigate to the home page after successful login
  //           //this.navController.navigateForward([`/${this.previousRoute}`]);
  //           this.navController.navigateForward('/home');
  //         } else {
  //           // Show an error message if the password does not match
  //           this.showAlert('Mật khẩu không đúng. Vui lòng thử lại.');
  //         }
  //       } else {
  //         // Show an error message if the username or phone number does not exist
  //         this.showAlert('Tên đăng nhập hoặc số điện thoại không tồn tại.');
  //       }
  //     });
  // }

// signInWithGoogle method in your component
async signInWithGoogle() {
  try {
    // Sign in with Google
    const result = await this.authService.signInWithGoogle();
    const user = result.user;
    
    if (user) {
      const userId = user.uid;
      const name = user.displayName || 'Anonymous';
      const email = user.email || '';

      // Check if the user already exists in Firestore
      const userDoc = await this.firestore.collection('users').doc(userId).get().toPromise();

      if (userDoc && userDoc.exists) {
        // User exists, just log them in
        console.log('User exists, logging in without creating a new user');
      } else {
        // User does not exist, create a new user
        const userData: User = {
          userId,
          name,
          email,
          phone: '', // No phone from Google sign-in, leave empty or fetch separately
          address: '', // Optionally add the address if available
          password: '', // Since this is Google, password field remains empty
        };
        await this.firestore.collection('users').doc(userId).set(userData);
        console.log('New user created in Firestore');
      }

      // Store userId in localStorage
      localStorage.setItem('userId', userId);
      // Redirect to the desired page
      this.navController.navigateForward('/home');
    }
  } catch (error) {
    console.error('Google sign-in error', error);
    this.showAlert('Error during Google sign-in. Please try again.');
  }
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
            address: '', // Optionally add the address if available
            password: '',
          };

          // Call the onSubmit function from AuthService
          const success = await this.authService.onSubmit(userData);

          if (success) {
            console.log('User data stored in Firestore');
            this.navController.navigateForward('/home');
          } else {
            this.showAlert('Error storing user data. Please try again later.');
          }
        }
      },
      (error: any) => {
        if (error.code === 'auth/popup-closed-by-user') {
          this.showAlert('Sign-in was canceled. Please try again.');
        } else {
          this.showAlert(
            'Something went wrong with Facebook sign-in. Please try again later.'
          );
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
