import { EmailTemplate } from '../../components/email-template.js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  console.log(req.body);
  const { data, error } = await resend.emails.send({
    from: 'antongomes.com <onboarding@resend.dev>',
    to: ['aomlgomes@gmail.com'],
    subject: 'New message from website',
    react: EmailTemplate(req.body.name, req.body.email, req.body.message),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
