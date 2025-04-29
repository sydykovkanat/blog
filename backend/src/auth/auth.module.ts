import { forwardRef, Module } from '@nestjs/common';

import { MailService } from '../libs/mail/mail.service';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';

@Module({
  imports: [forwardRef(() => EmailConfirmationModule)],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
