import { Injectable } from '@angular/core';
import * as jwt from 'jsonwebtoken';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  generateToken(payload: any, expiresIn: string = '1d'): string {
    return jwt.sign(payload, environment.jwt, { expiresIn });
  }

  validateToken(token: string): boolean {
    try {
      jwt.verify(token, environment.jwt);
      return true;
    } catch (error) {
      return false;
    }
  }
}
