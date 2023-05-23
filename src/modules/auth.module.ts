import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from 'src/controllers/auth.controller';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/guards/jwt.guard';
import { AuthService } from 'src/services/auth.service';
import { EventService } from 'src/services/event.service';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EventService, MailService],
})
export class AuthModule {}
