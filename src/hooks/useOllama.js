import axios from 'axios'
import { useReducer } from 'react'

const initialState = {
  messages: []
}

const chatReducer = (state, action) => { /* Estado actual y acción para modificarlo */
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    default:
      return state
  }
}

export const useOllama = () => {
  const [dispatch] = useReducer(chatReducer, initialState)
  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: userPrompt,
        stream: false
      })
      // dispatch para guardar y enviar al array
      dispatch({ type: 'ADD_MESSAGE', payload: { frome: 'user', text: userPrompt } }) // dispatch para guardar elmensaje del usuario
      dispatch({ type: 'ADD_MESSAGE', payload: { frome: 'bot', text: res.data.response } }) // dispatch para guardar la respuesta
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return { sendMessage }
}
