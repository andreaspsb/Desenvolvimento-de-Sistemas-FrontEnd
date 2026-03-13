import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import type { Serie } from './types'
import SerieForm from './components/SerieForm'
import SerieList from './components/SerieList'
import './App.css'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  const [series, setSeries] = useState<Serie[]>([]);

  function adicionarSerie(nova: Serie) {
    setSeries([...series, nova]);
  }

  function editarSerie(id: string, atualizada: Serie) {
    setSeries(series.map((serie) => (serie.id === id ? atualizada : serie)));
  }

  function excluirSerie(id: string) {
    setSeries(series.filter((serie) => serie.id !== id));
  }

  return (
    <Router>
      <div className="App">
        <NavBar />
        <h1>Site de Séries</h1>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<SerieList series={series} onDelete={excluirSerie} />} />
          <Route path="/adicionar" element={<SerieForm onAdd={adicionarSerie} />} />
          <Route path="/editar/:id" element={<SerieForm series={series} onEdit={editarSerie} />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="*" element={<h1>Página Não Encontrada</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
