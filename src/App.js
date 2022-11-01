import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUsers = event => {
    event.preventDefault();
    const name = event.target.name.value
    const email = event.target.email.value
    const user = { name, email };
    console.log(user);

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers)
      })
      .catch(err => console.error(err))

    event.target.reset();
  }



  return (
    <div className="App">
      <h2>Users {users.length}</h2>

      <form onSubmit={handleAddUsers}>
        <span>Name:</span> <input type="text" name="name" id="" /><br />
        <span>Email:</span> <input type="email" name="email" id="" /><br />
        <button type='submit'>Add Users</button>
      </form>
      {
        users.map(user => <p
          key={user.id}

        >
          {user.name} {user.email}
        </p>)
      }
    </div>
  );
}

export default App;
