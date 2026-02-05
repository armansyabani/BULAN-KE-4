// src/components/BasicForm.tsx
import { useForm } from 'react-hook-form'

interface FormData {
  firstName: string
  lastName: string
  email: string
}

export default function BasicForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('firstName', { required: 'First name is required' })}
          placeholder="First Name"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('lastName', { required: 'Last name is required' })}
          placeholder="Last Name"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.lastName && (
          <p className="text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          })}
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}