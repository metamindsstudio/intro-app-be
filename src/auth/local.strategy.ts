import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('LocalStrategy validate:', email);
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      console.log('User not found or password mismatch');
      throw new UnauthorizedException();
    }
    return user;
  }
}