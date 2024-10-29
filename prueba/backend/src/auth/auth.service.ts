import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { jwtConstants } from './constants'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async login(usuario: string, contraseña: string) {
    try {
      // Busca el usuario por nombre de usuario (ajusta según la función que tengas disponible en usersService)
      const usuarioEncontrado = await this.usersService.findOneByUsername(usuario);
  
      if (usuarioEncontrado && usuarioEncontrado instanceof Usuario) {
        // Compara la contraseña proporcionada con la almacenada
        const match = await this.usersService.comparePasswords(contraseña, usuarioEncontrado.contraseña);
  
        if (match) {
          // Crea el payload si la contraseña coincide
          const payload = { sub: usuarioEncontrado.id, usuario: usuarioEncontrado.usuario };
  
          // Genera y retorna el token de acceso
          return {
            access_token: await this.jwtService.sign(payload, { 
              secret: jwtConstants.secret,
              expiresIn: '1h' 
            })
          };
        } else {
          return {
            statusCode: 401,
            msg: "Credenciales incorrectas"
          };
        }
      } else {
        return {
          statusCode: 404,
          msg: "Usuario no encontrado"
        };
      }
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        msg: "Error en el servidor"
      };
    }
  }}