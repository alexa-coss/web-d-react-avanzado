import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { useOllama } from '../hooks/useOllama'

const schema = yup.object({
  userInput: yup
    .string()
    .min(3, 'El mensaje debe tener mínimo 3 caracteres.')
    .max(200, 'El mensaje debe tener máximo 200 caracteres.')
    .required('El mensaje es obligatorio')
})

export const ChatBot = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const { state, dispatch } = useContext(ChatContext)
  const { sendMessage } = useOllama()

  const handlePregunta = async (data) => {
    dispatch({ type: 'ADD_MESSAGE', payload: { from: 'user', text: data.userInput } }) // dispatch para guardar elmensaje del usuario
    dispatch({ type: 'SET_LOADING', payload: true }) // dispatch para guardar la respuesta

    try {
      const res = await sendMessage(data.userInput)
      dispatch({ type: 'ADD_MESSAGE', payload: { from: 'bot', text: res.data.response } })
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
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
      {/* <div>
        <p>{loading ? 'Generando respuesta 🚀' : response}</p>
      </div> */}
      <div>
        {state.messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.from === 'user' ? 'Tú' : 'Bot'}:</strong>
            {msg.text}
          </p>
        ))}
        {state.loading && <p>Generando respuesta 🚀</p>}
      </div>
    </>
  )
}
