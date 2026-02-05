// src/components/MultiStepForm.tsx
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'

interface FormData {
  // Step 1
  firstName: string
  lastName: string
  email: string
  // Step 2
  company: string
  position: string
  // Step 3
  bio: string
  website: string
}

const steps = [
  { id: 1, title: 'Personal Info' },
  { id: 2, title: 'Professional Info' },
  { id: 3, title: 'Additional Info' }
]

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger
  } = useForm<FormData>()

  const nextStep = async () => {
    const fields = getFieldsForStep(currentStep)
    const isValid = await trigger(fields as any)
    if (isValid) setCurrentStep(prev => Math.min(prev + 1, steps.length))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1: return ['firstName', 'lastName', 'email']
      case 2: return ['company', 'position']
      case 3: return ['bio', 'website']
      default: return []
    }
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Final submission:', data)
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`text-sm ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-400'}`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Personal Information</h2>
            <div>
              <Input
                {...register('firstName', { required: 'First name is required' })}
                placeholder="First Name"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('lastName', { required: 'Last name is required' })}
                placeholder="Last Name"
              />
              {errors.lastName && (
                <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('email', {
                  required: 'Email is required',
                  pattern: /^\S+@\S+$/i
                })}
                type="email"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Professional Information</h2>
            <div>
              <Input
                {...register('company', { required: 'Company is required' })}
                placeholder="Company"
              />
              {errors.company && (
                <p className="text-sm text-red-600 mt-1">{errors.company.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('position', { required: 'Position is required' })}
                placeholder="Position"
              />
              {errors.position && (
                <p className="text-sm text-red-600 mt-1">{errors.position.message}</p>
              )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Additional Information</h2>
            <div>
              <textarea
                {...register('bio', { required: 'Bio is required' })}
                placeholder="Tell us about yourself"
                className="w-full px-3 py-2 border rounded-md min-h-[100px]"
              />
              {errors.bio && (
                <p className="text-sm text-red-600 mt-1">{errors.bio.message}</p>
              )}
            </div>
            <div>
              <Input
                {...register('website')}
                placeholder="Website (optional)"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button type="button" onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}