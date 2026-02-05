// src/components/DynamicForm.tsx
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormData {
  projectName: string
  teamMembers: {
    name: string
    email: string
    role: string
  }[]
}

export default function DynamicForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      projectName: '',
      teamMembers: [{ name: '', email: '', role: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'teamMembers'
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div>
        <Input
          {...register('projectName', { required: 'Project name is required' })}
          placeholder="Project Name"
        />
        {errors.projectName && (
          <p className="text-sm text-red-600 mt-1">{errors.projectName.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Team Members</h3>

        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Member {index + 1}</h4>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Input
                  {...register(`teamMembers.${index}.name`, {
                    required: 'Name is required'
                  })}
                  placeholder="Full Name"
                />
                {errors.teamMembers?.[index]?.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.teamMembers[index]?.name?.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register(`teamMembers.${index}.email`, {
                    required: 'Email is required',
                    pattern: /^\S+@\S+$/i
                  })}
                  type="email"
                  placeholder="Email"
                />
                {errors.teamMembers?.[index]?.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.teamMembers[index]?.email?.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register(`teamMembers.${index}.role`, {
                    required: 'Role is required'
                  })}
                  placeholder="Role"
                />
                {errors.teamMembers?.[index]?.role && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.teamMembers[index]?.role?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={() => append({ name: '', email: '', role: '' })}
          className="w-full"
        >
          Add Team Member
        </Button>
      </div>

      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  )
}