import zod from 'zod';

const orderSchema = zod.object({
  userId: zod.string({
    required_error: 'Movie title is required.'
  }),
  products: zod.object().array(
    zod.object({
      productId: zod.string().ref('Product', {
        required_error: 'Product id is required.'
      }),
      quantity: zod.number().int().positive().default(1)
    }),
    {
      required_error: 'Products is required.'
    }
  ),
  amount: zod.number().positive().default(0),
  address: zod.object(
    {
      street: zod.string({
        required_error: 'Street is required.'
      }),
      city: zod.string({
        required_error: 'City is required.'
      }),
      province: zod.string({
        required_error: 'Province is required.'
      }),
      zip: zod.string({
        required_error: 'Zip is required.'
      })
    },
    {
      required_error: 'Address is required.'
    }
  ),
  phone: zod.string().default(''),
  status: zod.enum(['pending', 'in process', 'finished', 'cancelled', 'failed']).default('pending')
})

export function validateData (input) {
  return orderSchema.safeParse(input)
}

export function validatePartialData (input) {
  return orderSchema.partial().safeParse(input)
}
