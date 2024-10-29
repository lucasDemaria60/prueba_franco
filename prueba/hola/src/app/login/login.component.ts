import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { zorroService, User } from '../zorro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private zorroService: zorroService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password } = this.loginForm.value;
  
    this.zorroService.login(username, password).subscribe(
      response => {
        if (response.statusCode == 401) {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Usuario o contraseña incorrectos'
          });
          return;
        }
        localStorage.setItem("token", response.access_token)
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Error en el login', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el login',
          text: 'Ocurrió un error durante el proceso de inicio de sesión. Por favor, inténtalo nuevamente.'
        });
      }
    );
  }
  
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
