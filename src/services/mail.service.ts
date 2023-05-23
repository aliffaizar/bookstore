import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  constructor(private configService: ConfigService) {}

  private transporter() {
    return createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendVerificationEmail(payload: {
    email: string;
    token: string;
  }): Promise<void> {
    await this.transporter()
      .sendMail({
        from: `Bookstore System <${this.configService.get<string>(
          'MAIL_USER',
        )}>`,
        to: payload.email,
        subject: 'Verify your email address',
        html: `
        <h3>Verify your email address</h3>
        <p>Click <a href="http://localhost:3000/api/auth/verify-email/${payload.token}">here</a> to verify your email address</p>
      `,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendResetPasswordEmail(payload: {
    email: string;
    token: string;
  }): Promise<void> {
    await this.transporter()
      .sendMail({
        from: `Bookstore System <${this.configService.get<string>(
          'MAIL_USER',
        )}>`,
        to: payload.email,
        subject: 'Reset your password',
        html: `
        <h3>Reset your password</h3>
        <p>Click <a href="http://localhost:3000/reset-password/${payload.token}">here</a> to reset your password</p>
      `,
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
