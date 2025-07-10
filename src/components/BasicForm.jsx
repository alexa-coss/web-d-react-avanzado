import { useForm } from 'react-hook-form'

export const BasicForm = () => {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => { /* Manejar data */
    console.log(data)
  }

  return (
    // handleSubmit función pre-fabricada que recibe los datos | handleSubmit me pasa la data
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-blue-100 max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md flex flex-col gap-4'
    >
      <input
        type='text'
        {...register('username')}
        placeholder='User'
        className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <input
        type='password'
        {...register('password')}
        placeholder='Password'
        className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <input
        type='password'
        {...register('confirmPassword')}
        placeholder='Confirm password'
        className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />
      <button
        type='submit'
        className='bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors'
      >
        Enviar
      </button>
    </form>
  )
}
