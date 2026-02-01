
const COUPLE_EMAIL = "rhnoordman@gmail.com"; // ← Verander dit naar jullie email

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Skip test submissions
    if (data.email === "test@example.com") {
      return ContentService.createTextOutput(JSON.stringify({
        success: true
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!data.name || !data.email) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false, error: "Name and email required"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // Save to sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.attendingSaturday,
      data.attendingFriday || "",
      data.campingFriSat ? "Ja" : "Nee",
      data.campingSatSun ? "Ja" : "Nee",
      data.dietary || ""
    ]);

    // Send emails
    sendGuestEmail(data);
    sendCoupleNotification(data);

    return ContentService.createTextOutput(JSON.stringify({
      success: true
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false, error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function sendGuestEmail(data) {
  const attending = data.attendingSaturday === "yes";
  const subject = "Bevestiging RSVP - Bruiloft Jorinde & Dolf";

  let body = `Beste ${data.name},\n\nBedankt voor je reactie!\n\n`;
  body += `Zaterdag 20 juni (bruiloft): ${attending ? "Ja" : "Nee"}\n`;

  if (attending) {
    body += `Vrijdag 19 juni: ${data.attendingFriday === "yes" ? "Ja" :
      "Nee"}\n`;
    if (data.campingFriSat) body += `Kamperen vr→za: Ja\n`;
    if (data.campingSatSun) body += `Kamperen za→zo: Ja\n`;
  }
  if (data.dietary) body += `Dieetwensen: ${data.dietary}\n`;

  body += `\nWe kijken ernaar uit!\n\nLiefs,\nJorinde & Dolf`;

  GmailApp.sendEmail(data.email, subject, body);
}

function sendCoupleNotification(data) {
  const subject = `Nieuwe RSVP: ${data.name} (${data.attendingSaturday ===
    "yes" ? "Komt" : "Komt niet"})`;

  let body = `Naam: ${data.name}\n`;
  body += `Email: ${data.email}\n`;
  body += `Zaterdag: ${data.attendingSaturday}\n`;
  body += `Vrijdag: ${data.attendingFriday || "n.v.t."}\n`;
  body += `Kamperen vr→za: ${data.campingFriSat ? "Ja" : "Nee"}\n`;
  body += `Kamperen za→zo: ${data.campingSatSun ? "Ja" : "Nee"}\n`;
  body += `Dieet: ${data.dietary || "Geen"}`;

  GmailApp.sendEmail(COUPLE_EMAIL, subject, body);
}