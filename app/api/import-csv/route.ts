import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { parse } from 'csv-parse/sync'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const records = parse(body, { columns: true, skip_empty_lines: true }) as any[]
  const { error } = await supabase.from('prospects').insert(records)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ message: 'Import OK' })
}
