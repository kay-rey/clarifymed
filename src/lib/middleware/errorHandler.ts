import { NextResponse } from 'next/server'

export interface ErrorResponse {
  error: string
  code?: string
  details?: any
}

export function handleDatabaseError(error: any): NextResponse<ErrorResponse> {
  console.error('Database error:', error)
  
  if (error.code === 11000) {
    return NextResponse.json(
      { error: 'Duplicate entry', code: 'DUPLICATE_ERROR' },
      { status: 409 }
    )
  }

  return NextResponse.json(
    { error: 'Database error', code: 'DB_ERROR' },
    { status: 500 }
  )
}