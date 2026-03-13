import type { Serie } from "../../types"
import { useNavigate } from "react-router-dom"

function SerieList(props: { series: Serie[]; onDelete: (id: string) => void }) {
  //Uma página de listagem (séries cadastradas e todas as suas informações) com a possibilidade de exclusão e edição, podendo serem feitos através de botões ao lado de cada item.
  //Para a listagem, utilize uma tabela ou cards, onde cada linha ou card representa uma série cadastrada, exibindo suas informações e os botões de ação (editar e excluir).

  const navigate = useNavigate();

  function handleEdit(id: string) {
    navigate(`/editar/${id}`);
  }

  function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja excluir esta série?')) {
      props.onDelete(id);
    }
  }

  return (
    <div className="serie-list">
      <h2>Séries</h2>
      <ul>
        {props.series.map((serie) => (
          <li key={serie.id}>
            <h3>{serie.title}</h3>
            <p>Número de Temporadas: {serie.seasons}</p>
            <p>Data de Lançamento da Temporada: {serie.releaseDate}</p>
            <p>Diretor: {serie.director}</p>
            <p>Produtora: {serie.producer}</p>
            <p>Categoria: {serie.category}</p>
            <p>Data em que assistiu: {serie.watchedDate}</p>

            <button onClick={() => handleEdit(serie.id)}>Editar</button>
            <button onClick={() => handleDelete(serie.id)}>Excluir</button>

          </li>
        ))}
      </ul>
    </div>
  )
}

export default SerieList

