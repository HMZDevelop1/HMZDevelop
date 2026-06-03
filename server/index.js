import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import crypto from 'crypto'
import { readMessages, writeMessages } from './storage.js'

const PORT = process.env.PORT || 3001
const ADMIN_KEY = process.env.ADMIN_KEY || 'hmzadmin2024'

export function createApp() {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  const resendKey = process.env.RESEND_API_KEY
  let resend
  try {
    if (resendKey) resend = new Resend(resendKey)
  } catch {
    console.warn('✦ Resend not configured — email sending disabled')
  }
  const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev'
  const fromName = 'HMZDevelop'

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message, date, time, projectType, _honey } = req.body

      if (_honey) {
        return res.status(400).json({ error: 'Bot detected' })
      }

      const entry = {
        id: crypto.randomUUID(),
        name,
        email,
        message: message || '',
        projectType: projectType || '',
        date: date || '',
        time: time || '',
        createdAt: new Date().toISOString(),
        read: false,
      }

      const messages = readMessages()
      messages.unshift(entry)
      writeMessages(messages)

      let emailSent = false
      if (resend) {
        try {
          const emailBody = `
        <div style="font-family: system-ui; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B87333; border-bottom: 2px solid #B87333; padding-bottom: 12px;">
            ✦ New Inquiry — HMZDevelop
          </h2>

          ${date && time ? `
          <div style="background: #f5ede4; border: 1px solid #B87333; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <h3 style="margin: 0 0 8px; color: #b8960f;">📅 Google Meet Booking</h3>
            <p style="margin: 0; color: #333;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 0; color: #333;"><strong>Time:</strong> ${time}</p>
          </div>
          ` : ''}

          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; color: #888; width: 100px;">Name</td>
              <td style="padding: 10px; border: 1px solid #ddd; color: #333; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; color: #888;">Email</td>
              <td style="padding: 10px; border: 1px solid #ddd; color: #333;">
                <a href="mailto:${email}" style="color: #B87333;">${email}</a>
              </td>
            </tr>
            ${projectType ? `
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; color: #888;">Project Type</td>
              <td style="padding: 10px; border: 1px solid #ddd; color: #333;">${projectType}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; color: #888;">Date</td>
              <td style="padding: 10px; border: 1px solid #ddd; color: #333;">${new Date().toLocaleString()}</td>
            </tr>
          </table>

          ${message ? `
          <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 16px 0;">
            <h3 style="margin: 0 0 8px; color: #333;">💬 Message</h3>
            <p style="margin: 0; color: #555; line-height: 1.6;">${message}</p>
          </div>
          ` : ''}

          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          <p style="color: #aaa; font-size: 12px;">
            ID: ${entry.id} &middot;
            <a href="${process.env.SITE_URL || 'http://localhost:5173'}/admin" style="color: #B87333;">View in dashboard</a>
          </p>
        </div>
      `
          await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: process.env.NOTIFY_EMAIL || 'hamzachahby30@gmail.com',
            subject: `✦ New inquiry from ${name}`,
            html: emailBody,
          })
          emailSent = true
        } catch (emailErr) {
          console.error('Email send failed:', emailErr)
        }
      }

      res.json({ success: true, emailSent })
    } catch (err) {
      console.error('Contact error:', err)
      res.json({ success: false, error: 'Server error' })
    }
  })

  function requireAdmin(req, res, next) {
    const key = req.query.key || req.headers['x-admin-key']
    if (key !== ADMIN_KEY) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    next()
  }

  app.get('/api/messages', requireAdmin, (req, res) => {
    const messages = readMessages()
    res.json(messages)
  })

  app.patch('/api/messages/:id', requireAdmin, (req, res) => {
    const messages = readMessages()
    const idx = messages.findIndex((m) => m.id === req.params.id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })
    messages[idx] = { ...messages[idx], ...req.body }
    writeMessages(messages)
    res.json(messages[idx])
  })

  app.delete('/api/messages/:id', requireAdmin, (req, res) => {
    let messages = readMessages()
    messages = messages.filter((m) => m.id !== req.params.id)
    writeMessages(messages)
    res.json({ success: true })
  })

  app.get('/admin', (req, res) => {
    const dashboardHtml = getDashboardHtml()
    res.send(dashboardHtml)
  })

  return app
}

function getDashboardHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>HMZDevelop — Messages</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&family=Playfair+Display:ital,wght@0,600;1,400&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: #0a0a0a;
      color: #e0e0e0;
      min-height: 100vh;
    }
    .header {
      background: linear-gradient(135deg, #0a0a0a, #1a1a1a);
      border-bottom: 1px solid rgba(184, 115, 51, 0.15);
      padding: 20px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(12px);
    }
    .header h1 {
      font-family: 'Playfair Display', serif;
      font-size: 24px;
      color: #fff;
    }
    .header h1 span { color: #B87333; }
    .header .badge {
      background: rgba(184, 115, 51, 0.1);
      border: 1px solid rgba(184, 115, 51, 0.2);
      color: #B87333;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 500;
    }
    .container { max-width: 960px; margin: 0 auto; padding: 32px 16px; }
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 20px;
    }
    .stat-card .value {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      color: #B87333;
    }
    .stat-card .label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 4px;
    }
    .filters {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .filters input, .filters select {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 10px 16px;
      color: #e0e0e0;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }
    .filters input:focus, .filters select:focus {
      border-color: #B87333;
    }
    .filters input { flex: 1; min-width: 200px; }
    .message-card {
      background: rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 12px;
      transition: all 0.2s;
    }
    .message-card:hover {
      border-color: rgba(184, 115, 51, 0.2);
      background: rgba(255,255,255,0.04);
    }
    .message-card.unread {
      border-left: 3px solid #B87333;
      background: rgba(184, 115, 51, 0.03);
    }
    .message-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      gap: 12px;
    }
    .message-info h3 {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }
    .message-info .meta {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 4px;
    }
    .message-info .meta span {
      font-size: 12px;
      color: #666;
    }
    .message-info .meta .tag {
      background: rgba(184, 115, 51, 0.1);
      color: #B87333;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 11px;
    }
    .message-actions {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .message-actions button {
      background: none;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 6px;
      padding: 6px 12px;
      color: #888;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .message-actions .mark-btn:hover {
      border-color: #B87333;
      color: #B87333;
    }
    .message-actions .delete-btn:hover {
      border-color: #ef4444;
      color: #ef4444;
    }
    .message-body {
      font-size: 14px;
      line-height: 1.6;
      color: #b0b0b0;
    }
    .message-body .booking {
      background: rgba(184, 115, 51, 0.05);
      border: 1px solid rgba(184, 115, 51, 0.1);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 12px;
      display: inline-block;
    }
    .message-body .booking strong { color: #B87333; }
    .empty {
      text-align: center;
      padding: 64px 32px;
      color: #666;
    }
    .empty svg { margin-bottom: 16px; opacity: 0.3; }
    .empty h3 { font-family: 'Playfair Display', serif; color: #fff; margin-bottom: 8px; }
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #B87333;
      color: #0a0a0a;
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s;
      pointer-events: none;
    }
    .toast.show { opacity: 1; transform: translateY(0); }
    @media (max-width: 600px) {
      .header { padding: 16px; }
      .container { padding: 16px; }
      .message-header { flex-direction: column; }
    }
  </style>
</head>
<body>

<div class="header">
  <h1>HMZ<span>Develop</span></h1>
  <span class="badge" id="countBadge">0 messages</span>
</div>

<div class="container">
  <div class="stats">
    <div class="stat-card">
      <div class="value" id="totalCount">0</div>
      <div class="label">Total Messages</div>
    </div>
    <div class="stat-card">
      <div class="value" id="unreadCount">0</div>
      <div class="label">Unread</div>
    </div>
    <div class="stat-card">
      <div class="value" id="bookingCount">0</div>
      <div class="label">Bookings</div>
    </div>
  </div>

  <div class="filters">
    <input type="text" id="searchInput" placeholder="Search by name or email..." />
    <select id="filterSelect">
      <option value="all">All messages</option>
      <option value="unread">Unread</option>
      <option value="read">Read</option>
      <option value="booking">With booking</option>
    </select>
  </div>

  <div id="messagesList"></div>
</div>

<div class="toast" id="toast"></div>

<script>
const API_KEY = new URLSearchParams(window.location.search).get('key') || localStorage.getItem('adminKey')
if (API_KEY) localStorage.setItem('adminKey', API_KEY)

let messages = []

async function fetchMessages() {
  try {
    const res = await fetch('/api/messages?key=' + API_KEY)
    if (res.status === 401) {
      const key = prompt('Enter admin key:')
      if (key) {
        localStorage.setItem('adminKey', key)
        window.location.search = '?key=' + key
      }
      return
    }
    messages = await res.json()
    render()
  } catch (e) {
    console.error(e)
  }
}

function render() {
  const search = document.getElementById('searchInput').value.toLowerCase()
  const filter = document.getElementById('filterSelect').value

  let filtered = messages.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search) || m.email.toLowerCase().includes(search)
    if (!matchesSearch) return false
    if (filter === 'unread') return !m.read
    if (filter === 'read') return m.read
    if (filter === 'booking') return m.date && m.time
    return true
  })

  const total = messages.length
  const unread = messages.filter(m => !m.read).length
  const bookings = messages.filter(m => m.date && m.time).length

  document.getElementById('totalCount').textContent = total
  document.getElementById('unreadCount').textContent = unread
  document.getElementById('bookingCount').textContent = bookings
  document.getElementById('countBadge').textContent = total + ' message' + (total !== 1 ? 's' : '')

  const list = document.getElementById('messagesList')

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg><h3>No messages</h3><p>Nothing matches your filters.</p></div>'
    return
  }

  list.innerHTML = filtered.map(m => {
    const hasBooking = m.date && m.time
    const ago = timeAgo(m.createdAt)
    return '<div class="message-card' + (m.read ? '' : ' unread') + '">' +
      '<div class="message-header">' +
        '<div class="message-info">' +
          '<h3>' + escapeHtml(m.name) + '</h3>' +
          '<div class="meta">' +
            '<span>📧 ' + escapeHtml(m.email) + '</span>' +
            '<span>🕐 ' + ago + '</span>' +
            (m.projectType ? '<span class="tag">' + escapeHtml(m.projectType) + '</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="message-actions">' +
          '<button class="mark-btn" onclick="toggleRead(\'' + m.id + '\')">' + (m.read ? '📬' : '📩') + '</button>' +
          '<button class="delete-btn" onclick="deleteMsg(\'' + m.id + '\')">🗑</button>' +
        '</div>' +
      '</div>' +
      (hasBooking ? '<div class="message-body"><div class="booking">📅 <strong>Google Meet</strong> &mdash; ' + m.date + ' at ' + m.time + '</div></div>' : '') +
      (m.message ? '<div class="message-body">' + escapeHtml(m.message).replace(/\\n/g, '<br>') + '</div>' : '') +
    '</div>'
  }).join('')
}

async function toggleRead(id) {
  const msg = messages.find(m => m.id === id)
  if (!msg) return
  const res = await fetch('/api/messages/' + id + '?key=' + API_KEY, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: !msg.read })
  })
  if (res.ok) {
    msg.read = !msg.read
    render()
  }
}

async function deleteMsg(id) {
  if (!confirm('Delete this message?')) return
  const res = await fetch('/api/messages/' + id + '?key=' + API_KEY, { method: 'DELETE' })
  if (res.ok) {
    messages = messages.filter(m => m.id !== id)
    render()
    showToast('Message deleted')
  }
}

function timeAgo(dateStr) {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return mins + 'm ago'
  const hours = Math.floor(mins / 60)
  if (hours < 24) return hours + 'h ago'
  const days = Math.floor(hours / 24)
  return days + 'd ago'
}

function escapeHtml(str) {
  const div = document.createElement('div')
  div.textContent = str
  return div.innerHTML
}

function showToast(msg) {
  const el = document.getElementById('toast')
  el.textContent = msg
  el.classList.add('show')
  setTimeout(() => el.classList.remove('show'), 2000)
}

document.getElementById('searchInput').addEventListener('input', render)
document.getElementById('filterSelect').addEventListener('change', render)

fetchMessages()
setInterval(fetchMessages, 15000)
</script>
</body>
</html>`
}

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV
if (!isVercel) {
  const app = createApp()
  app.listen(PORT, () => {
    console.log(`✦ Server running on http://localhost:${PORT}`)
    console.log(`✦ Dashboard: http://localhost:${PORT}/admin?key=${ADMIN_KEY}`)
  })
}
