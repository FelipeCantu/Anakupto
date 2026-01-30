import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error('RESEND_API_KEY is not configured');
            return NextResponse.json(
                { error: 'Email service not configured' },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);
        const body = await request.json();
        const { name, email, message, formType, projectType, budget, company, description } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        let subject: string;
        let htmlContent: string;

        if (formType === 'project') {
            // Project inquiry form
            subject = `New Project Inquiry from ${name}`;
            htmlContent = `
                <h2>New Project Inquiry</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Project Type:</strong> ${projectType?.join(', ') || 'Not specified'}</p>
                <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
                <h3>Project Description:</h3>
                <p>${description || 'No description provided'}</p>
            `;
        } else {
            // Contact form
            subject = `New Contact from ${name}`;
            htmlContent = `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <h3>Message:</h3>
                <p>${message || 'No message'}</p>
            `;
        }

        const { data, error } = await resend.emails.send({
            from: 'Anakupto <onboarding@resend.dev>', // Change to your domain once verified
            to: process.env.CONTACT_EMAIL || 'hello@anakupto.com',
            replyTo: email,
            subject,
            html: htmlContent,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
