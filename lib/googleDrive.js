import { google } from "googleapis";
import fs from "fs";

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.SERVICE_ACCOUNT_PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
  client_x509_cert_url: process.env.CLIENT,
  universe_domain: process.env.UNIVERSE_DOMAIN,
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
