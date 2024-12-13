import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { SendDownloadEmailType } from '@/types/SendDownloadEmailType'

const EMAIL: string = 'mysocialscribe.info@gmail.com'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mysocialscribe.info@gmail.com',
    pass: 'ssjc mdmh ihlv umqu',
  },
})

export const sendDownloadEmail = async ({
  to,
  href,
  downloadName,
}: SendDownloadEmailType): Promise<void> => {
  try {
    const projectRoot = process.cwd()
    const templatePath = path.join(projectRoot, 'public', 'downloadEmailTemplate.html')

    // Read the HTML template
    let htmlContent = await fs.promises.readFile(templatePath, 'utf-8')

    // Replace placeholders in the HTML template
    htmlContent = htmlContent.replace('{{HREF}}', href).replace('{{DOWNLOAD_NAME}}', downloadName)

    // Configure email options
    const mailOptions = {
      from: EMAIL,
      to,
      subject: 'Your download is ready!',
      html: htmlContent,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully', to)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export const sendErrorEmail = async ({ to }: { to: string }): Promise<void> => {
  try {
    const projectRoot = process.cwd()
    const htmlContent = path.join(projectRoot, 'public', 'errorEmailTemplate.html')


    // Configure email options
    const mailOptions = {
      from: EMAIL,
      to,
      subject: 'Your download is ready!',
      html: htmlContent,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
    console.log('Email sent successfully', to)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}
