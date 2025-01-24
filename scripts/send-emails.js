import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, '..', '.env') });

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

    console.log(`Found ${subscribers?.length || 0} subscribers`);

    if (!subscribers || subscribers.length === 0) {
      console.log('No subscribers found to send emails to.');
      return;
    }

    // For testing, let's send to just one email first
    const testBatch = subscribers.slice(0, 1);
    
    for (const { email } of testBatch) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'SmartRisk <notifications@smartrisk-waitlist.com>',
          to: email,
          subject: 'Welcome to SmartRisk Waitlist!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1a365d; margin-bottom: 10px;">Welcome to SmartRisk!</h1>
                <p style="color: #4a5568; font-size: 16px;">Thank you for joining our waitlist</p>
              </div>
              
              <div style="background: #f7fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <h2 style="color: #2d3748; margin-bottom: 15px;">What's Next?</h2>
                <p style="color: #4a5568; line-height: 1.6;">
                  We're working hard to bring you the most advanced position sizing and risk management tool for traders. 
                  You'll be among the first to know when we launch!
                </p>
              </div>
              
              <div style="margin-top: 30px;">
                <p style="color: #4a5568; line-height: 1.6;">
                  In the meantime:
                  <ul style="margin-top: 10px;">
                    <li>Follow us on Twitter for updates</li>
                    <li>Share your thoughts in our survey</li>
                    <li>Invite fellow traders to join the waitlist</li>
                  </ul>
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="color: #718096; font-size: 14px;">
                  © 2024 SmartRisk. All rights reserved.
                </p>
              </div>
            </div>
          `
        });

        if (error) throw error;
        console.log(`✅ Test email sent successfully to ${email}`);
        console.log('Response:', data);
      } catch (err) {
        console.error(`❌ Failed to send email to ${email}:`, err);
      }
    }

    console.log('Test email campaign completed');
  } catch (error) {
    console.error('Error:', error);
  }
}

sendEmails();