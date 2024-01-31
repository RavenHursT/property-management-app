import {NextRequest, NextResponse} from 'next/server'
import {TProperty} from '../../../../lib/Property.model'
import {HydratedDocument} from 'mongoose'
import {Property} from '../../../../lib/Property.schema'
export async function GET(
  _: NextRequest,
  {params}: { params: { id: string } }
) {
  let property: HydratedDocument<TProperty> | null = null
  try {
    property = await Property.findById(params.id)
  } catch (e) {
    console.error(e)
    return new NextResponse(
      'BAD REQUEST',
      {status: 400}
    )
  }

  return property ?
    NextResponse.json(property):
    new NextResponse(
      'NOT FOUND',
      {status: 404}
    )
}

export async function DELETE(
  _: NextRequest,
  {params}: { params: { id: string } }
) {
  try {
    await Property.findByIdAndDelete(params.id)
  } catch (e) {
    console.error(e)
    return new NextResponse(
      'BAD REQUEST',
      {status: 400}
    )
  }
  return new NextResponse('OK', {status: 200})
}
