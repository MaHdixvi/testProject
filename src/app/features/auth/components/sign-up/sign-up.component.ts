import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { SignUpRequest } from '../../../../core/models/user.model';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.pattern(/^09[0-9]{9}$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return null;
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.markFormGroupTouched(this.signUpForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.signUpForm.value;

    // Check if email already exists
    this.authService.checkEmailExists(formData.email).subscribe({
      next: (emailExists) => {
        if (emailExists) {
          this.errorMessage = 'این ایمیل قبلاً ثبت شده است';
          this.isLoading = false;
          return;
        }

        // Proceed with registration
        const signUpData: SignUpRequest = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
        };

        this.authService.signUp(signUpData).subscribe({
          next: (response) => {
            this.successMessage =
              'ثبت نام با موفقیت انجام شد! در حال انتقال به صفحه ورود...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (error) => {
            this.errorMessage = 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.';
            this.isLoading = false;
          },
        });
      },
      error: (error) => {
        this.errorMessage = 'خطا در بررسی ایمیل. لطفاً دوباره تلاش کنید.';
        this.isLoading = false;
      },
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getErrorMessage(controlName: string): string {
    const control = this.signUpForm.get(controlName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return 'این فیلد اجباری است';
      }
      if (control.errors['email']) {
        return 'ایمیل معتبر وارد کنید';
      }
      if (control.errors['minlength']) {
        return `حداقل ${control.errors['minlength'].requiredLength} کاراکتر وارد کنید`;
      }
      if (control.errors['maxlength']) {
        return `حداکثر ${control.errors['maxlength'].requiredLength} کاراکتر مجاز است`;
      }
      if (control.errors['pattern']) {
        return 'شماره موبایل معتبر وارد کنید (09xxxxxxxxx)';
      }
    }
    return '';
  }

  get passwordMismatch(): boolean {
    const form = this.signUpForm;
    return (
      form.hasError('passwordMismatch') &&
      form.get('confirmPassword')?.touched === true
    );
  }
}
