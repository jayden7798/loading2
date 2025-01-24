import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmails() {
  try {
    // Get all subscribed emails
    const { data: subscribers, error } = await supabase
      .from('waitlist')
      .select('email')
      .eq('status', 'subscribed');

    if (error) throw error;

    console.log(`Found ${subscribers.length} subscribers`);

    // Send emails in batches of 10 to avoid rate limits
    const batchSize = 10;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);
      
      await Promise.all(batch.map(async ({ email }) => {
        try {
          await resend.emails.send({
            from: 'SmartRisk <notifications@yourdomain.com>',
            to: email,
            subject: 'Your SmartRisk Update',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1>Hello from SmartRisk!</h1>
                <p>Thank you for joining our waitlist. We're excited to share our latest updates with you.</p>
                <p>[Your email content here]</p>
                <p>Best regards,<br>The SmartRisk Team</p>
                <p style="color: #666; font-size: 12px; margin-top: 20px;">
                  If you no longer wish to receive these emails, 
                  <a href="[unsubscribe-link]">unsubscribe here</a>
                </p>
              </div>
            `
          });
          console.log(`Email sent successfully to ${email}`);
        } catch (err) {
          console.error(`Failed to send email to ${email}:`, err);
        }
      }));

      // Wait 1 second between batches to respect rate limits
      if (i + batchSize < subscribers.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('Email campaign completed');
  } catch (error) {
    console.error('Error:', error);
  }
}

sendEmails();