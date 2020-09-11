import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  async sendMail(to: string, body: string): Promise<void> {
    const content: SendMailOptions = {
      to,
      from: 'GoBarber <nao-responda@gobarber.com.br>',
      subject: 'Recuperação de senha',
      text: body,
    };

    const message = await this.client.sendMail(content);

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
