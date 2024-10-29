import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  usuario: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root'
})
export class zorroService {
  private apiUrl = 'http://localhost:3000/usuario'; // Reemplaza con tu URL de API

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para iniciar sesión
  login(usuario: string, contraseña: string): Observable<any> {
    const payload = { usuario, contraseña };
    return this.http.post(`http://localhost:3000/auth/login`, payload);
  }

  // Método para obtener usuarios (ejemplo adicional)
  get_nose(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
