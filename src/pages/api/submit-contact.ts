// src/pages/api/submit-contact.ts
import type { APIRoute, APIContext } from 'astro'; // Ensure APIContext is imported

// Define Env interface locally (matches env.d.ts)
interface Env {
  LOXO_API_KEY: string;
  LOXO_AGENCY_SLUG: string;
}

// Context object (context: APIContext) not ingesting types correctly
// Hence use to any
export const POST: APIRoute = async (context: APIContext) => {
  // Changed signature here
  // --- 1. Get Environment Variables ---
  const platform = context.platform; // Access via context.platform
  const platformEnv = platform?.env as Env | undefined;
  const metaEnv = import.meta.env; // For local dev .env fallback

  // Prioritize platform env (Cloudflare deployment), fallback to import.meta.env (local dev)
  const LOXO_API_KEY = platformEnv?.LOXO_API_KEY || metaEnv.LOXO_API_KEY;
  const LOXO_AGENCY_SLUG =
    platformEnv?.LOXO_AGENCY_SLUG || metaEnv.LOXO_AGENCY_SLUG;

  // API Domain
  const LOXO_DOMAIN = 'api.loxo.co';

  // --- Validation ---
  if (!LOXO_API_KEY) {
    console.error('Config Error: Loxo API Key (LOXO_API_KEY) not found.');
    return new Response(
      JSON.stringify({
        message: 'Server configuration error: Missing API Key.'
      }),
      { status: 500 }
    );
  }
  if (!LOXO_AGENCY_SLUG) {
    console.error(
      'Config Error: Loxo Agency Slug (LOXO_AGENCY_SLUG) not found.'
    );
    const findSlugMsg =
      'Find your Agency Slug: Loxo Account -> Initials/Picture -> Careers Page -> last part of URL.';
    return new Response(
      JSON.stringify({
        message: `Server configuration error: Missing Agency Slug. ${findSlugMsg}`
      }),
      { status: 500 }
    );
  }

  // --- 2. Parse Form Data ---
  const request = context.request; // Access via context.request
  let formData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error('Error parsing form data:', error);
    return new Response(JSON.stringify({ message: 'Invalid form data.' }), {
      status: 400
    });
  }

  const firstName = formData.get('firstName')?.toString();
  const lastName = formData.get('lastName')?.toString();
  const email = formData.get('email')?.toString();
  const phone = formData.get('phone')?.toString();
  const message = formData.get('message')?.toString();

  // Basic validation
  if (!firstName || !lastName || !email) {
    return new Response(
      JSON.stringify({
        message: 'Missing required fields (First Name, Last Name, Email).'
      }),
      { status: 400 }
    );
  }

  // --- 3. Prepare Loxo API Payload ---
  const loxoApiUrl = `https://${LOXO_DOMAIN}/api/${LOXO_AGENCY_SLUG}/people`;
  const loxoPayload = {
    person: {
      name: `${firstName} ${lastName}`,
      email: email,
      ...(phone && { phone: phone }),
      ...(message && { description: message })
    }
  };

  // --- 4. Make API Call to Loxo ---
  try {
    console.log(`Sending request to: ${loxoApiUrl}`);
    const response = await fetch(loxoApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LOXO_API_KEY}`
      },
      body: JSON.stringify(loxoPayload)
    });

    // --- 5. Handle Loxo Response ---
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `Loxo API Error (${response.status}) from ${loxoApiUrl}: ${errorBody}`
      );
      return new Response(
        JSON.stringify({
          message: `Failed to submit data. Error code: ${response.status}`
        }),
        { status: 502 }
      );
    }

    const loxoResult = await response.json();
    console.log('Successfully submitted to Loxo:', loxoResult);

    // --- 6. Redirect User on Success ---
    const redirect = context.redirect; // Access via context.redirect
    return redirect('/thank-you', 302);
  } catch (error) {
    console.error(
      `Network or other error submitting to Loxo API (${loxoApiUrl}):`,
      error
    );
    return new Response(
      JSON.stringify({
        message: 'An unexpected error occurred during submission.'
      }),
      { status: 500 }
    );
  }
};
