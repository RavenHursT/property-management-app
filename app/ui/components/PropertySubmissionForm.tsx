'use client'
import {Input, Textarea} from '@nextui-org/input'
import TagsInput from './TagsInput'
import USStates from './USStates.json'
import {Autocomplete, AutocompleteItem} from '@nextui-org/autocomplete'
import {Select, SelectItem} from '@nextui-org/select'
import {Button} from '@nextui-org/button'
import {FormEvent, useState} from 'react'

export type TAddress = {
  street1: string
  street2?: string
  city: string
  state: string
  postalCode: string
}

export interface IPropertySubmissonArgs {
  address: TAddress
  bedrooms: number | null
  bathrooms: number | null
  description: string
  amenities: Set<string>
}

export const PropertySubmissionForm = () => {
  const [amenities, setAmenities] = useState<Set<string>>(new Set([]))
  const [street1, setStreet1] = useState<string>('')
  const [street2, setStreet2] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [postalCode, setPostalCode] = useState<string>('')
  const [bedrooms, setBedrooms] = useState<number | null>(null)
  const [bathrooms, setBathrooms] = useState<number | null>(null)
  const [description, setDescription] = useState<string>('')

  const canSubmit = street1 &&
    city &&
    state &&
    postalCode &&
    bedrooms &&
    bathrooms &&
    description

  const clearForm = () => {
    setStreet1('')
    setStreet2('')
    setCity('')
    setState('')
    setPostalCode('')
    setBedrooms(null)
    setBathrooms(null)
    setDescription('')
    setAmenities(new Set([]))
  }

  const handleFormOnSubmit = (fields: IPropertySubmissonArgs) =>
    async (e: FormEvent) => {
      e.preventDefault()
      await fetch(
        '/api/properties', {
          method: 'POST',
          body: JSON.stringify({
            ...fields,
            amenities: [...fields.amenities]
          })
        })
      clearForm()
  }

  return <form
    onSubmit={handleFormOnSubmit({
      address: {
        street1,
        street2,
        city,
        state,
        postalCode
      },
      bedrooms,
      bathrooms,
      description,
      amenities
    })}
    className="flex flex-col gap-4">
    <fieldset className="w-full flex flex-row flex-wrap gap-4">
      <h3>Property Address</h3>
      <Input
        name="street1"
        label="Street Line 1"
        value={street1}
        onValueChange={setStreet1}
        isRequired/>
      <Input
        name="street2"
        value={street2}
        onValueChange={setStreet2}
        label="Street Line 2"/>
      <Input
        name="city"
        label="City"
        value={city}
        onValueChange={setCity}
        isRequired/>
      {/*
        TODO: Refactor these selects to use objects instead of Numbers to support
          form clearing.
      */}
      <Autocomplete
        label="State"
        value={state}
        onValueChange={setState}
        isRequired>
        {
          USStates.map(
            ({abbreviation}) => {
              return <AutocompleteItem
                key={abbreviation}
                value={abbreviation}
              >{abbreviation}</AutocompleteItem>
            }
          )
        }
      </Autocomplete>
      <Input
        name="postalCode"
        label="Postal Code"
        value={postalCode}
        onValueChange={setPostalCode}
        isRequired/>
    </fieldset>
    <fieldset className="w-full flex flex-row gap-4">
      {/*
        TODO: Refactor these selects to use objects instead of Numbers to support
          form clearing.
      */}
      <Select
        name="bedrooms"
        label="Number of Bedrooms"
        className="w-1/2"
        value={bedrooms || ''}
        onChange={(e) => setBedrooms(+e.target.value)}
        isRequired>
        {
          [1, 2, 3, 4, 5, 6].map(
            n => <SelectItem
              key={n}
              value={n}>{`${n}`}</SelectItem>
          )
        }
      </Select>
      <Select
        name="bathrooms"
        label="Number of Bathrooms"
        className="w-1/2"
        value={bathrooms || ''}
        onChange={(e) => setBathrooms(+e.target.value)}
        isRequired>
        {
          [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
            .map(v => ({k:v, v}))
            .map(
            item => <SelectItem
              key={item.k} value={item.v}>{`${item.v}`}</SelectItem>
          )
        }
      </Select>
    </fieldset>
    <Textarea
      isRequired
      name="description"
      label="Property Description"
      value={description}
      onValueChange={setDescription} />
    <TagsInput {...{
      label: 'Property Amenities',
      placeholder: 'Please enter amenities',
      description: 'Separate amenities w/ commas(","), or enter one at a time. Click +, or press ↵ to submit tags.',
      tags: amenities,
      setTags: setAmenities
    }} />
    <Button
      type="submit"
      isDisabled={!canSubmit}
      color="primary">Submit Property</Button>
  </form>
}
