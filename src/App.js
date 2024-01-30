// Importa il foglio di stile principale dell'applicazione
import './App.css';
import React from 'react';
import PokemonList from './pokeApi/pokeLogic.js'; // Importa il componente PokemonList
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom'; // Importa i componenti per il routing
import Login from './login/login.js'; // Importa il componente Login

// Componente funzionale Header per l'intestazione dell'applicazione
const Header = () => (
  <header>
    <nav className="navbar navbar-expand-lg">
      <div className="w-75 m-auto">
        <div className='d-flex justify-content-between align-items-center'>
          <img className='headerimg mb-3' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/800px-International_Pok%C3%A9mon_logo.svg.png' alt='pokemon'/>
          <div id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <span className="nav-link fs-4" aria-current="page" >Home</span>
                <span className="nav-link fs-4" aria-current="page" >Regioni</span>
              </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
);

// Componente funzionale che rappresenta la condizione dell'Header
const ConditionalHeader = () => {
  const navigate = useNavigate();

  // Ottieni il percorso corrente
  const currentPath = window.location.pathname;

  // Se il percorso è diverso da "/", mostra l'Header
  if (currentPath !== "/") {
    return <Header />;
  }

  // Se il percorso è "/", reindirizza a "/pokemon-list"
  navigate("/pokemon-list");

  // Non mostrare l'Header durante il reindirizzamento
  return null;
};

// Componente principale dell'applicazione
function App() {
  return (
    // Configurazione del Router per gestire le rotte dell'applicazione
    <Router>
      {/* Contenitore principale dell'applicazione */}
      <div className="App">
        {/* Componente Header condizionale */}
        <ConditionalHeader />
        {/* Definizione delle rotte dell'applicazione */}
        <Routes>
          {/* Pagina di default: mostra il componente Login */}
          <Route path="/" element={<Login />} />
          {/* Altre route qui: ad esempio, mostra il componente PokemonList */}
          <Route path="/pokemon-list/*" element={<Outlet />}>
            <Route index element={<PokemonList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// Esporta il componente principale per l'utilizzo in altri file
export default App;
