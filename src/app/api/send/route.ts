import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import dbConnect from '@/lib/dbConnect';
import { getServerSession, User } from 'next-auth';
import { authOptions } from '@/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

  await dbConnect()

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scraper`)
  const data = await response.json()
  console.log(data)

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return Response.json({
        success: false,
        message: "Unauthorized"
    },
    { status: 401 }
    )
  }

  // TODO: Add user email to the email in production.
  // const user = session.user as User

  const { subject, message } = await request.json();
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'DigestlyAI <no-reply@digestly.ai>',
      to: ['21b-203-cs@students.uit.edu'],
      subject: subject,
      react: EmailTemplate({ subject, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}