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
  })

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
    await api.delete(`repositories/${id}`)

    const repoIndex = repositories.findIndex(repository => repository.id === id)

    setRepositories(repositories.splice(repoIndex,1))
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
