const sgMail = require('@sendgrid/mail');

// Set API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email service class
class EmailService {
    constructor() {
        this.fromEmail = process.env.FROM_EMAIL || 'noreply@yourdomain.com';
        this.fromName = process.env.FROM_NAME || 'Facebook Clone';
    }

    // Send welcome email to new users
    async sendWelcomeEmail(userEmail, username) {
        const msg = {
            to: userEmail,
            from: {
                email: this.fromEmail,
                name: this.fromName
            },
            subject: 'Welcome to Facebook Clone!',
            text: `Hi ${username}, welcome to Facebook Clone! We're excited to have you on board.`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1877f2;">Welcome to Facebook Clone!</h2>
                    <p>Hi ${username},</p>
                    <p>Welcome to Facebook Clone! We're excited to have you on board.</p>
                    <p>Start connecting with friends and sharing your moments!</p>
                    <br>
                    <p>Best regards,<br>The Facebook Clone Team</p>
                </div>
            `
        };

        return this.sendEmail(msg);
    }

    // Send password reset email
    async sendPasswordResetEmail(userEmail, resetToken) {
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        
        const msg = {
            to: userEmail,
            from: {
                email: this.fromEmail,
                name: this.fromName
            },
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click this link to reset your password: ${resetUrl}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1877f2;">Password Reset Request</h2>
                    <p>You requested a password reset for your Facebook Clone account.</p>
                    <p>Click the button below to reset your password:</p>
                    <a href="${resetUrl}" style="background-color: #1877f2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">Reset Password</a>
                    <p>If the button doesn't work, copy and paste this link into your browser:</p>
                    <p>${resetUrl}</p>
                    <p>This link will expire in 1 hour.</p>
                    <br>
                    <p>If you didn't request this, please ignore this email.</p>
                </div>
            `
        };

        return this.sendEmail(msg);
    }

    // Send notification email (for new friends, comments, etc.)
    async sendNotificationEmail(userEmail, subject, message, actionUrl = null) {
        const msg = {
            to: userEmail,
            from: {
                email: this.fromEmail,
                name: this.fromName
            },
            subject: subject,
            text: message,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1877f2;">${subject}</h2>
                    <p>${message}</p>
                    ${actionUrl ? `<a href="${actionUrl}" style="background-color: #1877f2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0;">View Details</a>` : ''}
                </div>
            `
        };

        return this.sendEmail(msg);
    }

    // Generic email sending method
    async sendEmail(msg) {
        try {
            const result = await sgMail.send(msg);
            console.log('Email sent successfully:', result[0].statusCode);
            return { success: true, message: 'Email sent successfully' };
        } catch (error) {
            console.error('Error sending email:', error);
            
            if (error.response) {
                console.error('SendGrid error response:', error.response.body);
            }
            
            return { 
                success: false, 
                message: 'Failed to send email', 
                error: error.message 
            };
        }
    }
}

module.exports = new EmailService();