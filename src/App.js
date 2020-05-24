import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(response => setRepositories(response.data))
  },[])

  function removeRepository(id){
    const repositoryIndex = repositories.findIndex(r => r.id === id);
    repositories.splice(repositoryIndex, 1);
    setRepositories([...repositories])
  }

  async function handleAddRepository() {
    api.post('repositories', { title: `Tompero ${Date.now()}`})
      .then(response => setRepositories([...repositories, response.data]));
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`)
      .then(response => removeRepository(id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* {console.log(repositories)} */}
        {repositories.map(repository => (
          <li key={repository.id}>
            <span>{repository.title}</span>        
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>)
          )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
