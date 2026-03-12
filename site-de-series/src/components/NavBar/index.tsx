import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="navbar">
      <h1>Site de Séries</h1>
      
      <ul>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/">Séries</NavLink></li>
        <li><NavLink to="/adicionar">Formulário</NavLink></li>
      </ul>
    </nav>
  )
}

export default NavBar