"use server";
import { google } from "googleapis";

const serviceAccount = {
  type: "service_account",
  project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CLIENT,
  universe_domain: "googleapis.com",
};
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

async function listFolders() {
  const res = await drive.files.list({
    q: "'1QjF3IJ3cQFVKwKE7Ult87oOi_tMGqrA4' in parents ",
    fields: "files(id, name)",
  });
  return res.data.files;
}

export { listFolders };
