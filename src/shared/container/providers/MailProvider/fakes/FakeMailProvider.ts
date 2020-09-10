import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private mails: IMessage[] = [];

  async sendMail(to: string, body: string): Promise<void> {
    this.mails.push({ to, body });
  }
}
