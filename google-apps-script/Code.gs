/**
 * Exotic Cloudz — Booking Receiver (Google Apps Script Web App)
 *
 * Deploy this script as a Web App, then paste the resulting /exec URL into
 * VITE_BOOKING_ENDPOINT in your Vercel environment.
 *
 * Behavior:
 *   • Receives a JSON booking payload via POST (Content-Type: text/plain).
 *   • Appends a row to the configured Google Sheet.
 *   • Sends an email notification to OWNER_EMAIL.
 *   • Returns JSON { ok: true, id: <row id> }.
 *
 * Setup:
 *   1. Create a Google Sheet. Note its ID from the URL.
 *      e.g. https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit  →  paste below.
 *   2. Replace SHEET_ID and OWNER_EMAIL constants.
 *   3. Add a header row to the sheet (row 1):
 *      Submitted At | Package | Date | Time | Name | Phone | Address | Flavors | Source | User Agent
 *   4. In Apps Script: Deploy → New deployment → type "Web app".
 *      • Execute as:        Me
 *      • Who has access:    Anyone
 *   5. Authorize, then copy the Web App URL (ends in /exec).
 *   6. Set VITE_BOOKING_ENDPOINT=<that URL> in Vercel env vars and redeploy the frontend.
 */

const SHEET_ID = 'REPLACE_WITH_YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Bookings';
const OWNER_EMAIL = 'aitest0203@gmail.com';

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    const payload = JSON.parse(raw);

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME)
      || SpreadsheetApp.openById(SHEET_ID).insertSheet(SHEET_NAME);

    // Ensure header row exists
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submitted At', 'Package', 'Date', 'Time', 'Name',
        'Phone', 'Address', 'Flavors', 'Source', 'User Agent'
      ]);
    }

    sheet.appendRow([
      payload.submittedAt || new Date().toISOString(),
      payload.package || '',
      payload.date || '',
      payload.time || '',
      payload.name || '',
      payload.phone || '',
      payload.location || '',
      payload.flavors || '',
      payload.source || '',
      payload.userAgent || ''
    ]);

    const rowId = sheet.getLastRow();

    // Notify owner
    try {
      MailApp.sendEmail({
        to: OWNER_EMAIL,
        subject: 'New Exotic Cloudz Booking Request — ' + (payload.name || 'Unknown'),
        htmlBody:
          '<h2>New Booking Request</h2>' +
          '<p><strong>Client:</strong> ' + (payload.name || '') + '</p>' +
          '<p><strong>Phone:</strong> ' + (payload.phone || '') + '</p>' +
          '<p><strong>Package:</strong> ' + (payload.package || '') + '</p>' +
          '<p><strong>Date:</strong> ' + (payload.date || '') + ' @ ' + (payload.time || '') + '</p>' +
          '<p><strong>Address:</strong> ' + (payload.location || '') + '</p>' +
          '<p><strong>Flavors:</strong> ' + (payload.flavors || "Chef's Choice") + '</p>' +
          '<hr/><small>Submitted ' + (payload.submittedAt || '') + '</small>'
      });
    } catch (mailErr) {
      // Mail failure should not fail the booking write.
      console.error('Mail error: ' + mailErr);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, id: rowId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Exotic Cloudz Booking Receiver' }))
    .setMimeType(ContentService.MimeType.JSON);
}
