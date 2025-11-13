import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private serviceId = 'service_8atvnkn';
  private templateId = 'template_8xj1fvj';
  private publicKey = 'qiIymn_Wyoc4nZ2qU';

  constructor() {}

  async sendEmail(templateParams: any): Promise<void> {
    try {
      const response: EmailJSResponseStatus = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams,
        this.publicKey
      );
      console.log('📧 Email enviado con exito:', response.status, response.text);
    } catch (error) {
      console.error('❌ Error enviando el correo:', error);
    }
  }
}
