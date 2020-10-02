// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useEffect, useState} from 'react'

function Greeting({initialName = ''}) {
  const [name, setName] = useState(initialName)

  useEffect(() => {
    document.title = name ? `Hello ${name}` : 'Please type your name'
  }, [name])

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Kenny" />
}

export default App
