import React, { createContext, useReducer } from 'react'

// 1. Crear el contexto global
export const ChatContext = createContext()

const initialState = {
  messages: []
}

const chatReducer = (state, action) => { /* Estado actual y acción para modificarlo */
  switch (action.type) {
    case 'ADD_MESSAGE':
      console.log('Agregando mensaje...')
      console.log(state)
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

/* // dispatch para guardar y enviar al array
dispatch({ type: 'ADD_MESSAGE', payload: { frome: 'user', text: userPrompt } }) // dispatch para guardar elmensaje del usuario
dispatch({ type: 'ADD_MESSAGE', payload: { frome: 'bot', text: res.data.response } }) // dispatch para guardar la respuesta */

// 2. Provider

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState)
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
}
