import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, "submissions.json");

const app = express();
app.use(cors());
app.use(express.json());

// ---------- helpers ----------

function loadSubmissions() {
  if (!existsSync(DB_PATH)) return [];
  try { return JSON.parse(readFileSync(DB_PATH, "utf-8")); }
  catch { return []; }
}

function saveSubmission(data) {
  const all = loadSubmissions();
  all.unshift(data);
  writeFileSync(DB_PATH, JSON.stringify(all, null, 2));
}

// ---------- mailer ----------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Premium HTML email to admin (you)
function buildAdminEmail(data) {
  const { name, company, email, projectType, budget, message } = data;
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>New Project Inquiry</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; font-family: 'DM Sans', Arial, sans-serif; color: #fff; }
</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#050505;border:1px solid rgba(251,100,145,0.25);border-bottom:none;padding:40px 48px 32px;">
        <div style="font-size:11px;letter-spacing:0.25em;color:#fb6491;text-transform:uppercase;margin-bottom:8px;">New Inquiry</div>
        <div style="font-size:36px;font-weight:700;letter-spacing:-0.02em;text-transform:uppercase;line-height:1;color:#fff;">
          THREE <span style="color:#fb6491;">SISTERS</span> KSA
        </div>
      </td></tr>

      <!-- Pink bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#fb6491,rgba(251,100,145,0.2));"></td></tr>

      <!-- Body -->
      <tr><td style="background:#050505;border:1px solid rgba(251,100,145,0.25);border-top:none;padding:40px 48px;">

        <p style="font-size:18px;font-weight:600;color:#fff;margin-bottom:8px;">You have a new project inquiry 🎯</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.45);margin-bottom:36px;">A potential client just submitted a request via your website.</p>

        <!-- Details grid -->
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
          ${[
            ["Client Name", name || "—"],
            ["Company", company || "—"],
            ["Email", email],
            ["Project Type", projectType || "—"],
            ["Budget", budget || "—"],
          ].map(([label, value]) => `
          <tr>
            <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);width:40%;">
              <span style="font-size:10px;letter-spacing:0.18em;color:rgba(255,255,255,0.3);text-transform:uppercase;">${label}</span>
            </td>
            <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
              <span style="font-size:14px;font-weight:500;color:#fff;">${value}</span>
            </td>
          </tr>`).join("")}
        </table>

        ${message ? `
        <div style="margin-top:28px;padding:20px 24px;background:rgba(251,100,145,0.06);border-left:2px solid #fb6491;">
          <div style="font-size:10px;letter-spacing:0.18em;color:rgba(255,255,255,0.3);text-transform:uppercase;margin-bottom:10px;">Message</div>
          <p style="font-size:14px;font-weight:300;color:rgba(255,255,255,0.75);line-height:1.7;">${message}</p>
        </div>` : ""}

        <!-- CTA -->
        <div style="margin-top:36px;text-align:center;">
          <a href="https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent("Let's schedule a meeting — Three Sisters KSA")}"
             style="display:inline-block;background:#fb6491;color:#000;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 36px;">
            Reply to Client →
          </a>
        </div>

      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:24px 48px;text-align:center;">
        <p style="font-size:11px;color:rgba(255,255,255,0.2);">Three Sisters KSA · Branding & Advertising Studio · Saudi Arabia</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// Premium HTML confirmation email to client
function buildClientEmail(data) {
  const { name, projectType } = data;
  const meetLink = "https://calendar.google.com/calendar/u/0/r/eventedit?add=muaddhalsway@gmail.com";
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>We received your inquiry</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; font-family: 'DM Sans', Arial, sans-serif; color: #fff; }
</style>
</head>
<body>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#050505;border:1px solid rgba(251,100,145,0.25);border-bottom:none;padding:48px 48px 36px;text-align:center;">
        <div style="font-size:11px;letter-spacing:0.25em;color:#fb6491;text-transform:uppercase;margin-bottom:12px;">Three Sisters KSA</div>
        <div style="font-size:42px;font-weight:700;letter-spacing:-0.02em;text-transform:uppercase;line-height:1;color:#fff;">
          Let's Build<br/><span style="color:#fb6491;">Something Iconic</span>
        </div>
      </td></tr>

      <!-- Pink bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#fb6491,rgba(251,100,145,0.2));"></td></tr>

      <!-- Body -->
      <tr><td style="background:#050505;border:1px solid rgba(251,100,145,0.25);border-top:none;padding:40px 48px;text-align:center;">

        <p style="font-size:22px;font-weight:600;color:#fff;margin-bottom:12px;">
          Hello, ${name} 👋
        </p>
        <p style="font-size:15px;font-weight:300;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:32px;">
          Your inquiry for <strong style="color:#fb6491;">${projectType || "your project"}</strong> has been received.<br/>
          We review every submission personally and will be in touch within <strong style="color:#fff;">24–48 hours</strong>.
        </p>

        <!-- Divider -->
        <div style="height:1px;background:rgba(255,255,255,0.06);margin:32px 0;"></div>

        <!-- Schedule meeting block -->
        <div style="background:rgba(251,100,145,0.06);border:1px solid rgba(251,100,145,0.2);padding:32px 36px;margin-bottom:32px;">
          <div style="font-size:10px;letter-spacing:0.2em;color:#fb6491;text-transform:uppercase;margin-bottom:12px;">Ready to move faster?</div>
          <p style="font-size:15px;font-weight:300;color:rgba(255,255,255,0.65);line-height:1.7;margin-bottom:24px;">
            Skip the wait — schedule a <strong style="color:#fff;">Google Meet discovery call</strong> directly with our team and let's talk about your vision.
          </p>
          <a href="${meetLink}"
             style="display:inline-block;background:#fb6491;color:#000;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;padding:16px 40px;">
            📅 &nbsp; Schedule a Meeting
          </a>
        </div>

        <!-- What to expect -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:16px;text-align:center;border:1px solid rgba(255,255,255,0.06);border-right:none;">
              <div style="font-size:22px;margin-bottom:6px;">🎯</div>
              <div style="font-size:11px;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">Strategy</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:4px;">Deep brand discovery</div>
            </td>
            <td style="padding:16px;text-align:center;border:1px solid rgba(255,255,255,0.06);border-right:none;">
              <div style="font-size:22px;margin-bottom:6px;">✦</div>
              <div style="font-size:11px;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">Craft</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:4px;">Premium execution</div>
            </td>
            <td style="padding:16px;text-align:center;border:1px solid rgba(255,255,255,0.06);">
              <div style="font-size:22px;margin-bottom:6px;">🚀</div>
              <div style="font-size:11px;font-weight:600;color:#fff;letter-spacing:0.1em;text-transform:uppercase;">Launch</div>
              <div style="font-size:12px;color:rgba(255,255,255,0.35);margin-top:4px;">Results that matter</div>
            </td>
          </tr>
        </table>

      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:28px 48px;text-align:center;border:1px solid rgba(255,255,255,0.04);border-top:none;">
        <p style="font-size:11px;color:rgba(255,255,255,0.2);margin-bottom:6px;">
          Three Sisters KSA · Branding & Advertising Studio · Saudi Arabia
        </p>
        <p style="font-size:11px;color:rgba(255,255,255,0.15);">
          You're receiving this because you submitted an inquiry on our website.
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ---------- routes ----------

// Submit form
app.post("/api/submit", async (req, res) => {
  const { name, company, email, projectType, budget, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  const submission = {
    id: Date.now().toString(),
    name, company, email, projectType, budget, message,
    submittedAt: new Date().toISOString(),
    read: false,
  };

  // Save to JSON store
  saveSubmission(submission);

  try {
    // Email to admin
    await transporter.sendMail({
      from: `"Three Sisters KSA" <${process.env.GMAIL_USER}>`,
      to: "muaddhalsway@gmail.com",
      subject: `✦ New Inquiry from ${name}${company ? ` — ${company}` : ""} | Three Sisters KSA`,
      html: buildAdminEmail(submission),
    });

    // Confirmation email to client
    await transporter.sendMail({
      from: `"Three Sisters KSA" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your inquiry — Three Sisters KSA ✦",
      html: buildClientEmail(submission),
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    // Still return success — submission was saved, just mail failed
    res.json({ success: true, mailError: err.message });
  }
});

// Get all submissions (admin)
app.get("/api/submissions", (req, res) => {
  res.json(loadSubmissions());
});

// Mark submission as read
app.patch("/api/submissions/:id/read", (req, res) => {
  const all = loadSubmissions();
  const updated = all.map(s => s.id === req.params.id ? { ...s, read: true } : s);
  writeFileSync(DB_PATH, JSON.stringify(updated, null, 2));
  res.json({ success: true });
});

// Mark all as read
app.patch("/api/submissions/read-all", (req, res) => {
  const all = loadSubmissions().map(s => ({ ...s, read: true }));
  writeFileSync(DB_PATH, JSON.stringify(all, null, 2));
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✦ Three Sisters API running on http://localhost:${PORT}`));
