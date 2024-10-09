import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Lähetä pyyntö Spring Boot -backendille
    fetch('http://localhost:8080/api/spring/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Vastaus backendilta:', data);
      })
      .catch((error) => {
        console.error('Virhe:', error);
      });
  };

  return (
    <div>
      <h1>Lähetä tietoa Spring Bootille</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nimi:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Lähetä</button>
      </form>
    </div>
  );
}
  /*const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}*/

export default App
