import { useEffect, useState } from "react";

import "./global.css";
import styles from "./App.module.css";

function App() {
  const [users, setUsers] = useState([]);
  const [usersAux, setUsersAux] = useState([]);
  const [cont, setCont] = useState(0);

  function getUsers() {
    try {
      fetch('http://localhost:4000/api/users')
        .then(response => response.json())
        .then(data => setUsers(data))
    } catch(error) {
      console.log(error)
    }
  }

  function addHero(hero) {
    setUsersAux([...usersAux, hero]);
  }

  function handleFetchClick() {
    if(cont < users.length) {
      try {      
        fetch('http://localhost:4000/api/users')
          .then(response => response.json())
          .then(data => {
            addHero(data[cont]);            
            setCont(state => state + 1);
          })      
      } catch(error) {
        console.log(error)
      }
    }
  }  

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className={styles.container}>
      <h1>Heroes</h1>
      <div className={styles.buttonContainer}>
        <button onClick={handleFetchClick} disabled={cont >= users.length}>
          Fetch
        </button>
        {
          cont >= users.length && users.length !== 0 && <small>Não há mais itens</small>
        }        
      </div>
      <div className={styles.heroes}>
        {
          usersAux?.map((user) => {
            return (
                <div key={user.name} className={styles.hero}>
                  <img src={user.image} alt={user.name} />
                  <p key={user.name}>{user.name}</p>
                </div>
            )
          })
        }      
      </div>
    </div>
  );
}

export default App;
