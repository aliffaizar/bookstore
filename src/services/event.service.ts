import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';

import { MailService } from './mail.service';

@Injectable()
export class EventService {
  constructor(
    private jwtService: JwtService,

    private mailService: MailService,
  ) {}

  @OnEvent('sendVerificationEmail')
  async handleSendVerificationEmail(payload: {
    email: string;
    id: number;
  }): Promise<void> {
    const token = await this.jwtService.signAsync(payload, { expiresIn: '1d' });
    await this.mailService.sendVerificationEmail({
      email: payload.email,
      token,
    });
  }
}
