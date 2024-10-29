import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/auth'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  // Método para registrar usuarios
  registerUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para loguear usuarios
  loginUser(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Método para obtener la lista de usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/usuarios`);
  }
}
