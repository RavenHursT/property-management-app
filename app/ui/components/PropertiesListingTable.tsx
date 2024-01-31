'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import {addressAsString, TProperty} from '../../../lib/Property.model'
import {Link} from '@nextui-org/link'
import {Chip} from '@nextui-org/chip'
import {Button} from '@nextui-org/button'
import {useState} from 'react'

type PropertiesListingTableProps = {
  initProperties: TProperty[]
}

export const PropertiesListingTable = ({
  initProperties = []
}: PropertiesListingTableProps) => {
  const [properties, setProperties] = useState(initProperties)
  const handleDeleteOnClick = (property: TProperty) => async () => {
    if(confirm('Are you sure you want to delete?')) {
      await fetch(`/api/properties/${property._id}`, {
        method: 'DELETE'
      })
      setProperties(properties.filter(({_id}) => _id !== property._id))
    }
  }
  return <Table aria-label="Example static collection table">
    <TableHeader>
      <TableColumn>Address</TableColumn>
      <TableColumn># of Beds</TableColumn>
      <TableColumn># of Baths</TableColumn>
      <TableColumn>Description</TableColumn>
      <TableColumn>Amenities</TableColumn>
      <TableColumn>Actions</TableColumn>
    </TableHeader>
    <TableBody>
      {properties.map(
        property => <TableRow key={property._id}>
          <TableCell>
            <Link href={`/admin/property-details/${property._id}`}>{addressAsString(property)}</Link>
          </TableCell>
          <TableCell>{property.bedrooms}</TableCell>
          <TableCell>{property.bathrooms}</TableCell>
          <TableCell>{property.description}</TableCell>
          <TableCell>{
            property.amenities.map(amenity =>
              <Chip
                key={amenity}
                className="mr-1 mb-1"
                size="sm">{amenity}</Chip>)
          }</TableCell>
          <TableCell>
            <Link href={`/admin/property-details/${property._id}`}>
              <Button
                className="mr-1"
                size="sm"
                color="primary">View Details</Button>
            </Link>
            <Button
              size="sm"
              onClick={handleDeleteOnClick(property)}
              color="warning"
            >Delete</Button>
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
}
