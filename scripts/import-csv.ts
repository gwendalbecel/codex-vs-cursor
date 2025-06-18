#!/usr/bin/env node
import { readFile } from 'fs/promises'

async function main() {
  const file = process.argv[2]
  if (!file) {
    console.error('Usage: import-csv <file>')
    process.exit(1)
  }
  const csv = await readFile(file, 'utf8')
  const res = await fetch('http://localhost:3000/api/import-csv', {
    method: 'POST',
    headers: { 'Content-Type': 'text/csv' },
    body: csv,
  })
  if (!res.ok) {
    console.error('Import failed:', await res.text())
    process.exit(1)
  }
  console.log('Import successful')
}

main()
