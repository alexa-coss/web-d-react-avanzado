import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import './index.css'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react'
import { useData } from './hooks/useData'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres.')
    .max(200, 'El mensaje debe tener máximo 200 caracteres.')
    .required('El mensaje es obligatorio')
})

export const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  // Guarda la respuesta de llama2
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const { multiplicar } = useData()

  console.log(multiplicar(5))

  const handlePregunta = async (data) => {
    console.log(data)
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: data.userInput,
        stream: false
      })
      setResponse(res.data.response)
    } catch (error) {
      console.error('error: ', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handlePregunta)}
        className='bg-blue-100 max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-md flex flex-col gap-4'
      >
        <input
          type='text'
          {...register('userInput')}
          className='p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        {errors.userInput && <p>{errors.userInput.message}</p>}
        <button
          className='bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors'
        >Preguntar
        </button>
      </form>
      <div>
        <p>{loading ? 'Generando respuesta 🚀' : response}</p>
      </div>
    </>
  )
}
