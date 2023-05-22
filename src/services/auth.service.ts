import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { LoginDto, RegisterDto } from 'src/dto/authentication.dto';
import { UserWithToken } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  private async comparePasswords(
    password: string,
    hased: string,
  ): Promise<boolean> {
    return await compare(password, hased);
  }

  private async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private async signToken(payload: {
    id: number;
    email: string;
    role: string;
  }): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async register(userData: RegisterDto): Promise<User> {
    const role = 'user';
    const hashedPassword = await this.hashPassword(userData.password);
    const user = await this.userRepository.save({
      ...userData,
      password: hashedPassword,
      role,
    });
    delete user.password;
    return user;
  }

  async login({ email, password }: LoginDto): Promise<UserWithToken> {
    const user = await this.findUserByEmail(email);
    const isPasswordValid = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password;
    const token = await this.signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { ...user, token };
  }
}
