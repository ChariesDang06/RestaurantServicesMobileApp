import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'; // Import the AuthService
import { User } from '../../models/user.model'; // Import the User model
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signInForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,  // Inject AuthService
    private alertController: AlertController,
    private navCtrl: NavController,
    private firestore: AngularFirestore // Inject Firestore
  ) {
    this.signInForm = new FormGroup({
  userName: new FormControl('', [Validators.required], this.checkUsernameTaken()),  
  password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  passwordRecheck: new FormControl('', [Validators.required]),  // Will check against 'password'
  phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
  email: new FormControl('', [Validators.required, Validators.email]),
  address: new FormControl('', [Validators.required])
}, this.passwordsMatchValidator);  // Pass the validator function directly

  }

  ngOnInit() {}

  // Custom validator for password matching
 passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('passwordRecheck')?.value;

  return password === confirmPassword ? null : { passwordsDoNotMatch: true };
}


// Async validator function
checkUsernameTaken(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return this.firestore.collection('users', ref => ref.where('userName', '==', control.value))
      .get()
      .pipe(
        map((snapshot) => {
          return snapshot.size > 0 ? { usernameTaken: true } : null;
        })
      );
  };
}
  // Submit function for form data
  async onSubmit() {
  if (this.signInForm.valid) {
    const password = this.signInForm.get('password')?.value;

    // Hash the password
    const salt = bcrypt.genSaltSync(10); // Adjust the salt rounds as needed
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create User object based on form data (without userId for now)
    const user: Partial<User> = {
      name: this.signInForm.get('userName')?.value,
      phone: this.signInForm.get('phone')?.value,
      email: this.signInForm.get('email')?.value,
      address: this.signInForm.get('address')?.value,
      password: hashedPassword // Store the hashed password
    };

    // Call the service method to submit the form
    const success = await this.authService.onSubmit(user);

    if (success) {
      const alert = await this.alertController.create({
        header: 'Success',
        message: 'User registration successful!',
        buttons: ['OK'],
      });
      await alert.present();
      this.signInForm.reset();
      this.navCtrl.navigateForward('/home'); // Navigate after success
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Failed to register. Please try again later.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  } else {
    // Handle invalid input errors here
    let errorMessage = '';

    if (this.signInForm.hasError('mismatch')) {
      errorMessage += 'Passwords do not match.\n';
    }
    if (this.signInForm.get('userName')?.hasError('usernameTaken')) {
      errorMessage += 'Username is already taken.\n';
    }
    if (this.signInForm.get('phone')?.hasError('minlength')) {
      errorMessage += 'Phone number must be at least 10 digits.\n';
    }
    if (this.signInForm.get('password')?.hasError('minlength')) {
      errorMessage += 'Password must be at least 6 characters.\n';
    }

    const alert = await this.alertController.create({
      header: 'Invalid Input',
      message: errorMessage || 'Please fill all required fields correctly.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}

}
