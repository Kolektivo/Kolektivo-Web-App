import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(req.url)
  return NextResponse.json({ msg: params.id })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(req.url)
  return NextResponse.json({ msg: params.id })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log(req.url)
  return NextResponse.json({ msg: params.id })
}
