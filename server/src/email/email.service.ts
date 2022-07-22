import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'phobos902080@gmail.com',
        pass: 'prumireyypcfwsmf',
      },
    });
  }

  async sendMemberResetPassword(emailAddress: string, newPassword: string) {
    const baseUrl = 'http://localhost:3000';

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '[TWOGATHER]비밀번호 초기화 안내 메일입니다.',
      html: `
      <div style='font-family: 'Apple SD Gothic Neo', 'sans-serif' !important; width: 540px; height: 600px; border-top: 4px solid #348fe2; margin: 100px auto; padding: 30px 0; box-sizing: border-box;'>
      <h1 style='margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400;'>
      <span style='font-size: 15px; margin: 0 0 10px 3px;'>[TWOGATHER]</span><br />
      <span style='color: #348fe2;'>변경된 비밀번호</span> 안내입니다.
      </h1>
      <p style='font-size: 16px; line-height: 26px; margin-top: 50px; padding: 0 5px;'>
      안녕하세요.<br />
      비밀번호가 초기화되었습니다.<br />
      변경된 비밀번호는 아래와 같습니다.<br />
      감사합니다.
      </p>
      <p style='font-size: 16px; margin: 40px 5px 20px; line-height: 28px;'>
      변경된 비밀번호: <br />
      <span style='font-size: 24px;'>
      ${newPassword}
      </span>
      </p>
      <div style='border-top: 1px solid #DDD; padding: 5px;'>
      </div>
      </div>;
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

  //가입 인증
  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
