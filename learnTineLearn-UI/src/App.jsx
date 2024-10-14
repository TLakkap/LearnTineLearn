import { useState } from 'react'

const url = 'http://localhost:8080/api/spring/'

function App() {
  const [newInfo, setNewInfo] = useState('')
  const [info, setInfo] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(url+'new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ info: newInfo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Vastaus backendilta:', data);
        setMessage(data.message)
        setNewInfo('')
      })
      .catch((error) => {
        console.error('Virhe:', error);
      });
  };

  const handleClick = () => {
    console.log("clicked")
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("data:",data.message)
        setInfo(data.message)
      })
      .catch((error) => {
        console.error('Virhe:', error);
      })
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Show new info</button>
      <h2>{info}</h2>
      <h4>Save new</h4>
      <form onSubmit={handleSubmit}>
        <label>
          New:
          <input
            type="text"
            value={newInfo}
            onChange={(e) => setNewInfo(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <div>{message}</div>
      </form>
    </div>
  );
}

export default App
