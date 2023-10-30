import zod from 'zod';

const productSchema = zod.object({
  title: zod.string({
    required_error: 'Product title is required.'
  }),
  deac: zod.string({
    required_error: 'Product description is required.'
  }),
  img: zod.string({
    required_error: 'Product url image is required.'
  }).url({
    message: 'Poster must be a valid URL'
  }),
  categories: zod.string().array(),
  size: zod.string().array(),
  color: zod.string().array(),
  price: zod.number().int().positive(),
  stock: zod.number().int().positive().default(0)
})

export function validateData (input) {
  return productSchema.safeParse(input)
}

export function validatePartialData (input) {
  return productSchema.partial().safeParse(input)
}
