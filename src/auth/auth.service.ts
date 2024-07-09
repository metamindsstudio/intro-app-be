import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Validating user', email);
    const user = await this.usersService.findOne(email);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      console.log('Password match:', isMatch);
      if (isMatch) {
        const { password, ...result } = user;
        console.log('User validated', result);
        return result;
      }
    }
    console.log('User validation failed');
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, isSeller: user.isSeller };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({ ...userDto, password: hashedPassword });
    return user;
  }
}