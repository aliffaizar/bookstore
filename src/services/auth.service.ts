import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { User } from 'src/entities/user.entity';
import { LoginDto, RegisterDto } from 'src/dto/authentication.dto';
import { UserWithToken } from 'src/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly eventEmitter: EventEmitter2,
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
    const role = 'user'; // prevent user from setting role
    const isVerified = false; // prevent user from setting isVerified
    const hashedPassword = await this.hashPassword(userData.password);
    try {
      const user = await this.userRepository.save({
        ...userData,
        password: hashedPassword,
        role,
        isVerified,
      });
      this.eventEmitter.emit('sendVerificationEmail', {
        id: user.id,
        email: user.email,
      });
      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      console.log(error);
      throw error;
    }
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
    if (!user.isActive) {
      throw new UnauthorizedException('please verify your email');
    }
    delete user.password;
    const token = await this.signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return { ...user, token };
  }

  async resendVerificationEmail(email: string): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (user.isActive) {
      throw new ConflictException('User already verified');
    }
    // send email
  }

  async verifyUser(token: string): Promise<User> {
    const payload = await this.jwtService.verifyAsync(token);
    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    if (user.isActive) {
      throw new ConflictException('User already verified');
    }
    user.isActive = true;
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }
}
