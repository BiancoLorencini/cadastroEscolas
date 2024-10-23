import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const EscolaContext = createContext()



export const EscolaProvider = ({ children }) => {
  const [escola, setEscola] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getEscola = async () => {
    try {
      const response = await axios.get('http://localhost:3001/escolas')
      setEscola(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEscola();
  }, [])


  return (
    <EscolaContext.Provider value={{ escola, loading, error }}>
      {children}
    </EscolaContext.Provider>
  )
}

export default EscolaProvider
