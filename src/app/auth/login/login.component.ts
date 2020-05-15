import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  get formEmail(): string {
    return this.form.email.value;
  }

  get formPassword(): string {
    return this.form.password.value;
  }

  ngOnInit() {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe((loginRes: any) => {
      if (loginRes.wasLogined) {
        this.writeDataToLocalStorage(loginRes);
        this.authService.setLoginState(true);
        this.router.navigate(['home']);
      } else {
        this.snackBar.open(
          'Your email or password was incorrect! Try again!',
          'ОК',
          {
            duration: 5000,
            verticalPosition: 'top'
          });
      }
    });
  }

  resetEmail() {
    this.form.email.setValue('');
  }

  resetPassword() {
    this.form.password.setValue('');
  }

  togglePassword() {
    this.hide = !this.hide;
  }

  writeDataToLocalStorage(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}
