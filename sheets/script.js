
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
      data.postcode || "",
      data.huisnummer || "",
      data.straat || "",
      data.woonplaats || "",
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
  const subject = attending
    ? "Tot op 27 juni! ♥ Bruiloft Jorinde & Dolf"
    : "Bedankt voor je reactie - Bruiloft Jorinde & Dolf";

  let body = `Lieve ${data.name},\n\n`;

  if (attending) {
    body += `Wat fijn dat je erbij bent op onze bruiloft!\n\n`;
    body += `Dit hebben we van je genoteerd:\n`;
    body += `────────────────────────────\n`;
    if (data.straat && data.woonplaats) {
      body += `◦ Adres: ${data.straat} ${data.huisnummer}, ${data.postcode} ${data.woonplaats}\n`;
    }
    body += `◦ Zaterdag 27 juni (bruiloft): Ja\n`;
    body += `◦ Vrijdag 26 juni (borrel): ${data.attendingFriday === "yes" ? "Ja" : "Nee"}\n`;
    if (data.campingFriSat || data.campingSatSun) {
      body += `◦ Kamperen: `;
      const nights = [];
      if (data.campingFriSat) nights.push("vr→za");
      if (data.campingSatSun) nights.push("za→zo");
      body += nights.join(" en ") + "\n";
    }
    if (data.dietary) body += `◦ Dieetwensen / Opmerkingen: ${data.dietary}\n`;
    body += `────────────────────────────\n\n`;
    body += `We kijken er ontzettend naar uit om samen met jou te vieren!\n`;
  } else {
    body += `Bedankt voor je reactie. Jammer dat je er niet bij kunt zijn, maar we begrijpen het.\n\n`;
    body += `We denken aan je op onze grote dag!\n`;
  }

  body += `\nLiefs,\nJorinde & Dolf\n\n`;
  body += `─\nwww.jorindeendolf.nl`;

  GmailApp.sendEmail(data.email, subject, body);
}

function sendCoupleNotification(data) {
  const subject = `Nieuwe RSVP: ${data.name} (${data.attendingSaturday ===
    "yes" ? "Komt" : "Komt niet"})`;

  let body = `Naam: ${data.name}\n`;
  body += `Email: ${data.email}\n`;
  if (data.straat && data.woonplaats) {
    body += `Adres: ${data.straat} ${data.huisnummer}, ${data.postcode} ${data.woonplaats}\n`;
  }
  body += `Zaterdag: ${data.attendingSaturday}\n`;
  body += `Vrijdag: ${data.attendingFriday || "n.v.t."}\n`;
  body += `Kamperen vr→za: ${data.campingFriSat ? "Ja" : "Nee"}\n`;
  body += `Kamperen za→zo: ${data.campingSatSun ? "Ja" : "Nee"}\n`;
  body += `Dieet: ${data.dietary || "Geen"}`;

  GmailApp.sendEmail(COUPLE_EMAIL, subject, body);
}