import mongoose from 'mongoose'
import {TProperty} from './Property.model'

const PropertySchema = new mongoose.Schema<TProperty>({
  address: {
    street1: {
      type: String,
      required: true
    },
    street2: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  amenities: {
    type: [String],
    required: true
  }
})
export const Property: mongoose.Model<TProperty> = mongoose.models.Property || mongoose.model(
  'Property',
  PropertySchema
)
