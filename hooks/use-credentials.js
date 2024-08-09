import { useState } from 'react'

export default function useCredentials(email = '', password = '') {
  const [state, setState] = useState({
    email,
    password,
  })

  const setCredentials = (update) => setState({ ...state, ...update })

  return [state.email, state.password, setCredentials]
}
