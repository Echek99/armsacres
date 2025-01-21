import { type SchemaTypeDefinition } from 'sanity'
import { product } from './product'
import { category } from './category'
import { blog } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, blog]
}
