import { useState } from 'react'

const url = 'http://localhost:8080/api/spring/'

function App() {
  const [newInfo, setNewInfo] = useState('')
  const [info, setInfo] = useState('')
  const [infoId, setInfoId] = useState()
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
      /*.then((response) => response.json())
      .then((data) => {
        console.log('Vastaus backendilta:', data);*/
      .then((response) => {
        if(response.status === 201) setMessage('Created')
        else setMessage('Failed to create info')    
        //setMessage(message)
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
        console.log("data:",data.info)
        setInfo(data.info)
        setInfoId(data.id)
      })
      .catch((error) => {
        console.error('Virhe:', error);
      })
  }

  const handleDelete = () => {
    console.log("delete:", infoId)
    fetch(url+infoId, {
      method: 'DELETE'
    })
    .then((response) => {
      if(response.status === 200) console.log('Deleted')
      else console.log('Failed to delete info')
      })
    .catch((error) => {
      console.error('Virhe:', error)
    })
  }

  return (
    <div>
      <button onClick={() => handleClick()}>Show new info</button>
      <h2>{info}</h2>
      <button onClick={() => handleDelete()}>Delete</button>
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
