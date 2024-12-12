
import z from 'zod'

const SignUpSchema = z.object({
    email: z.string().email({message: 'Invalid email'}),
    password: z.string().min(5).max(16, {message: 'Password must be between 5 and 16 characters'}),
    name: z.string().min(3).max(16, {message: 'Name must be between 3 and 16 characters'}).optional()
})

export default SignUpSchema