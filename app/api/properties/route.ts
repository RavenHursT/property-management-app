import {NextRequest, NextResponse} from 'next/server'
import {HydratedDocument} from 'mongoose'
import {TProperty} from '../../../lib/Property.model'
import {Property} from '../../../lib/Property.schema'

export async function GET() {
  const properties: HydratedDocument<TProperty>[] = await Property.find({})
  return NextResponse.json(properties)
}

export async function POST(
  req: NextRequest
) {
  const property = new Property(
    await req.json()
  )
  try {
    await property.save()
  } catch (e) {
    console.error(e)
    return new NextResponse(
      'BAD REQUEST',
      {status: 400}
    )
  }
  return new NextResponse(
    'CREATED',
    {status: 201}
  )
}
