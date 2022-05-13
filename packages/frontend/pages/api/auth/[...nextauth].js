import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path from 'path';

import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


// Email sender
const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_SERVER_HOST,
   port: process.env.EMAIL_SERVER_PORT,
   auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
   },
   secure: true,
});

const emailsDir = path.resolve(process.cwd(), 'emails');

const sendVerificationRequest = async ({ identifier, url }) => {
   try {
      const emailFile = readFileSync(path.join(emailsDir, 'confirm-email.html'), {
         encoding: 'utf8',
      });
      const emailTemplate = Handlebars.compile(emailFile);
      await sendgrid.send({
         to: identifier,
         from: {
            email: "gratisgames-noreply@riseup.net",
            name: "✨ GratisGames"
         },
         subject: 'Your sign-in link for GratisGames',
         html: emailTemplate({
            base_url: process.env.NEXTAUTH_URL,
            signin_url: url,
            email: identifier,
         }),
      });
   } catch (error) {
      console.log(`❌ Unable to send sign-in magic email to user (${email})`);
      console.log(error);
   };
}


const sendWelcomeEmail = async ({ user }) => {
   const { email } = user;

   try {
      const emailFile = readFileSync(path.join(emailsDir, 'welcome.html'), {
         encoding: 'utf8',
      });
      const emailTemplate = Handlebars.compile(emailFile);
      await sendgrid.send({
         to: email,
         from: {
            email: "gratisgames-noreply@riseup.net",
            name: "✨ GratisGames"
         },
         subject: 'Welcome to GratisGames! 🎉',
         html: emailTemplate({
            base_url: process.env.NEXTAUTH_URL,
            support_email: 'gratisgames@riseup.net',
         }),
      });
   } catch (error) {
      console.log(`❌ Unable to send welcome email to user (${email})`);
      console.log(error);
   }
};

export default NextAuth({
   pages: {
      signIn: '/',
      signOut: '/',
      error: '/',
      verifyRequest: '/',
   },
   providers: [
      EmailProvider({
         maxAge: 10 * 60,
         sendVerificationRequest,
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   adapter: PrismaAdapter(prisma),
   events: { createUser: sendWelcomeEmail },
});
