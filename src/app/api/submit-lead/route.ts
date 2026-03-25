import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // The user will replace this empty string with their Google Apps Script Web App URL
    // e.g., const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      console.warn('GOOGLE_SCRIPT_URL is not defined in environment variables.');
      return NextResponse.json({ 
        success: false, 
        message: 'Configuration Error: GOOGLE_SCRIPT_URL is missing.' 
      }, { status: 500 });
    }

    console.log('Attempting to send lead to Google Script:', GOOGLE_SCRIPT_URL.substring(0, 30) + '...');

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...body
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error text');
      console.error('Google Script Error Response:', errorText);
      throw new Error(`Google Script returned ${response.status}: ${errorText}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('CRITICAL: Error in submit-lead API:', {
      message: error.message,
      stack: error.stack,
      cause: error.cause
    });
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', debug: error.message },
      { status: 500 }
    );
  }
}
