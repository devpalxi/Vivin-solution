export async function sendContactToHubSpot({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
}) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN; // Add this to your .env.local

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        email,
        firstname: name,
        phone,
        subject,
        message,
        // Add more fields as needed
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("HubSpot error:", error);
    return { success: false, error };
  }
  return { success: true };
}

export async function sendNewsletterToHubSpot(email: string) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

  const res = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    },
    body: JSON.stringify({
      properties: {
        email,
        // Only include properties that exist in your HubSpot account
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("HubSpot error:", error);
    return { success: false, error };
  }
  return { success: true };
}
