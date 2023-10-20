import zod from 'zod';

const cartSchema = zod.object({
  userId: zod.string().ref('User', {
    required_error: 'UserId is required.'
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
  )
})

function validateData (input) {
  return cartSchema.safeParse(input)
}

function validatePartialData (input) {
  return cartSchema.partial().safeParse(input)
}

module.exports = {
  validateData,
  validatePartialData
}
