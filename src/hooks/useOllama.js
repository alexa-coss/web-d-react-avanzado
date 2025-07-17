import axios from 'axios'

export const useOllama = () => {
  const sendMessage = async (userPrompt) => {
    try {
      const res = await axios.post('http://localhost:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: userPrompt,
        stream: false
      })
      return res
      // dispatch para guardar y enviar al array
    } catch (error) {
      console.error('error: ', error)
    }
  }

  return { sendMessage }
}
