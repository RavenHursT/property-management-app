import {Card, CardBody, CardFooter, CardHeader} from '@nextui-org/card'
import {Divider} from '@nextui-org/react'
import {Link} from '@nextui-org/link'
import {Property} from '../../../../lib/Property.schema'
import {addressAsString, TProperty} from '../../../../lib/Property.model'
import {Chip} from '@nextui-org/chip'

const PropertyDetailsPage = async ({params: {id}}: {params: {id: string}}) => {
  const property = await Property.findById(id) as TProperty

  return <Card className="">
    <CardHeader className="flex gap-3">
      <div className="flex flex-col">
        <p className="text-md">{addressAsString(property)}</p>
      </div>
    </CardHeader>
    <Divider/>
    <CardBody>
      <p>
        <label className="font-bold mr-2"># of
          Beds:</label><span>{property.bedrooms}</span>
      </p>
      <p>
        <label className="font-bold mr-2"># of
          Baths:</label><span>{property.bathrooms}</span>
      </p>
      <div>
        <label className="font-bold mr-2">Description:</label>
        <div className="px-2">{property.description}</div>
      </div>
      <div>
        <label className="font-bold mr-2">Amenities:</label>
        <div className="px-2">{property.amenities.map(
          amenity => <Chip className="mr-1">{amenity}</Chip>
        )}</div>
      </div>
    </CardBody>
    <Divider/>
    <CardFooter>
      <Link
        href="/admin"
      >
        Back to properties listing
      </Link>
    </CardFooter>
  </Card>
}

export default PropertyDetailsPage
