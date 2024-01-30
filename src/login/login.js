// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';


const Login = () => {
  // Stati per gestire i dati di input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Funzione di navigazione fornita da React Router
  const navigate = useNavigate();

  // Funzione chiamata al cliccare del pulsante "Login"
  const handleLogin = async () => {
    try {
      // Effettua la chiamata API per ottenere i dati degli utenti
      const response = await axios.get('https://localhost:7177/api/Login');

      // Estrai gli utenti dalla risposta
      const users = response.data;
      console.log(users);

      // Verifica se esiste un utente con le credenziali fornite
      const isValidUser = users.some(user => user.username === username && user.password === password);

      // Se le credenziali sono valide, reindirizza a "/pokemon-list"
      if (isValidUser) {
        navigate('/pokemon-list');
      } else {
        // Avviso se le credenziali non sono valide
        alert('Credenziali non valide. Riprova.');
      }
    } catch (error) {
      // Gestisci gli errori della chiamata API
      console.error('Errore durante la chiamata API:', error);
      // Avviso generico in caso di errore
      alert('Si è verificato un errore. Riprova più tardi.');
    }
  };

  return (
    <div>
      <img className='logimg mb-3' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png' alt='pokemon'/>
      {/* Input per l'username */}
      <div className='container w-25 loginContainer'>
        <h3 className='pt-2'>PokeTrainer</h3>
        <div className="input-group flex-nowrap mb-2">
          <span className="input-group-text" id="addon-wrapping">User</span>
          <input className="form-control" placeholder="username" aria-label="username" aria-describedby="addon-wrapping"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/* Input per la password */}
        <div className="input-group flex-nowrap mb-2">
          <span className="input-group-text" id="addon-wrapping">Psw</span>
          <input className="form-control" placeholder="password" aria-label="password" aria-describedby="addon-wrapping"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Pulsante di login */}
        <button onClick={handleLogin} className='btn btn-danger mb-3' type='button'>Login</button>
      </div>
    </div>
  );
};

export default Login;
