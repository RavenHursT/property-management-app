export type TProperty = {
  _id: string,
  address: {
    street1: string,
    street2: string,
    city: string,
    state: string,
    postalCode: string
  },
  description: string,
  bedrooms: number,
  bathrooms: number,
  amenities: string[]
}

export const addressAsString = ({address: {
  street1,
  street2,
  city,
  state,
  postalCode
}}: TProperty) =>
  `${street1}${street2 ? ` ${street2}` : ``}, ${city}, ${state} ${postalCode}`

