import React from "react";

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {

      "title": `Novo Repositório ${Date.now()}`,
      "url": "http://github.com/LeoALvanrega/DesafioNodeJs",
      "techs": ["React.js", "JavaScript"]

    })

    const repo = response.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    console.log(response.status)

    if(response.status === 204) {
      console.log("id", id)

      console.log("repositories", repositories)
      
      const filteredRepositories = repositories.filter(repository => repository.id !== id)
      console.log("Filteredrepositories", filteredRepositories)
      
      setRepositories(filteredRepositories)
      console.log("repositories", repositories)
    } else {
      console.log("error", response.statusText)
    }


  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
