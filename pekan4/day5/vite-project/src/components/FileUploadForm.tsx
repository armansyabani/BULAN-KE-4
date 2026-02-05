// src/components/FileUploadForm.tsx
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FileFormData {
  title: string
  description: string
  file: FileList
}

export default function FileUploadForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FileFormData>()

  const fileInput = watch('file')

  // Preview image when file is selected
  useEffect(() => {
    if (fileInput?.[0]) {
      const file = fileInput[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [fileInput])

  const onSubmit = async (data: FileFormData) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('file', data.file[0])

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form data:', Object.fromEntries(formData))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div>
        <Input
          {...register('title', { required: 'Title is required' })}
          placeholder="Document Title"
        />
        {errors.title && (
          <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Description"
          className="w-full px-3 py-2 border rounded-md min-h-[100px]"
        />
        {errors.description && (
          <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <Input
          {...register('file', { required: 'File is required' })}
          type="file"
          accept="image/*,.pdf,.doc,.docx"
        />
        {errors.file && (
          <p className="text-sm text-red-600 mt-1">{errors.file.message}</p>
        )}
      </div>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-48 object-cover rounded-md"
          />
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Uploading...' : 'Upload Document'}
      </Button>
    </form>
  )
}