import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

class FileStorage {
  constructor(filePath) {
    this.filePath = filePath || join(__dirname, 'messages.json')
  }

  read() {
    if (!existsSync(this.filePath)) return []
    return JSON.parse(readFileSync(this.filePath, 'utf-8'))
  }

  write(messages) {
    writeFileSync(this.filePath, JSON.stringify(messages, null, 2))
  }
}

class MemoryStorage {
  constructor() {
    this.data = []
  }

  read() {
    return this.data
  }

  write(messages) {
    this.data = messages
  }
}

let storage

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview'

if (isVercel) {
  storage = new MemoryStorage()
  console.log('✦ Using MemoryStorage (Vercel)')
} else {
  storage = new FileStorage()
  console.log('✦ Using FileStorage (local)')
}

export function readMessages() {
  return storage.read()
}

export function writeMessages(messages) {
  storage.write(messages)
}
