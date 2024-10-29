import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { zorroService, User } from '../zorro.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private zorroService: zorroService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const user: User = this.registerForm.value;

    // Llamar al servicio de registro
    this.zorroService.register(user).subscribe(
      response => {
        console.log('Registro exitoso', response);
        Swal.fire({
          icon: 'success',
          title: 'Registro Exitoso',
          text: '¡El usuario ha sido registrado correctamente!',
        }).then(() => {
          // Redirigir al componente de login
          this.router.navigate(['/login']);
        });
      },
      error => {
        console.error('Error en el registro', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el Registro',
          text: 'Hubo un problema durante el registro. Por favor, intenta nuevamente.',
        });
      }
    );
  }
}
