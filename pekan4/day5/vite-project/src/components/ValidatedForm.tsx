// src/components/ValidatedForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registerSchema } from '@/lib/validations'

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export default function ValidatedForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterForm) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <Input
          {...register('firstName')}
          placeholder="First Name"
        />
        {errors.firstName && (
          <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('lastName')}
          placeholder="Last Name"
        />
        {errors.lastName && (
          <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('confirmPassword')}
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  )
}