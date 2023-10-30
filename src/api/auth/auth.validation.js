import zod from 'zod';

const userSchema = zod.object({
  username: zod.string({
    required_error: 'Username is required.'
  }),
  email: zod.string({
    required_error: 'Email is required.'
  }).email(),
  password: zod.string({
    required_error: 'Password is required.'
  }),
  isAdmin: zod.boolean(),
  confirmed: zod.boolean()
})

export function validateData (input) {
  return userSchema.safeParse(input)
}

export function validatePartialData (input) {
  return userSchema.partial().safeParse(input)
}
