import type { Serie } from "../../types"
import { useNavigate, useParams } from "react-router-dom"

type SerieFormProps = {
  onAdd?: (nova: Serie) => void
  onEdit?: (id: string, atualizada: Serie) => void
  series?: Serie[]
}

function SerieForm({ onAdd, onEdit, series }: SerieFormProps) {

  const { id } = useParams();
  const serieParaEditar = id ? series?.find((s) => s.id === id) : null;
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Lógica para enviar o formulário
    const formData = new FormData(event.currentTarget);

    const title = (formData.get('title') as string)?.trim();
    const seasonsRaw = (formData.get('seasons') as string)?.trim();
    const seasons = Number(seasonsRaw);
    const releaseDate = (formData.get('releaseDate') as string)?.trim();
    const director = (formData.get('director') as string)?.trim();
    const producer = (formData.get('producer') as string)?.trim();
    const category = (formData.get('category') as string)?.trim();
    const watchedDate = (formData.get('watchedDate') as string)?.trim();

    if (!title || isNaN(seasons) || !releaseDate || !director || !producer || !category || !watchedDate) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    if (!Number.isFinite(seasons) || !Number.isInteger(seasons) || seasons <= 0) {
      alert('Numero de temporadas invalido. Use um inteiro maior que 0.');
      return;
    }

    const newSerie: Serie = {
      id: Date.now().toString(),
      title: title,
      seasons: seasons,
      releaseDate: releaseDate,
      director: director,
      producer: producer,
      category: category,
      watchedDate: watchedDate
    };

    if (id) {
      onEdit?.(id, newSerie);
    } else {
      onAdd?.(newSerie);
    }

    navigate('/') // Volta pra listagem após salvar
  }

  return (
    <div className="serie-form">
      <h2>{id ? 'Editar Série' : 'Adicionar Série'}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" defaultValue={serieParaEditar?.title} placeholder="Título" />
        <label htmlFor="seasons">Número de Temporadas:</label>
        <input type="number" id="seasons" name="seasons" defaultValue={serieParaEditar?.seasons} placeholder="Número de Temporadas" />
        <label htmlFor="releaseDate">Data de Lançamento da Temporada:</label>
        <input type="date" id="releaseDate" name="releaseDate" defaultValue={serieParaEditar?.releaseDate} placeholder="Data de Lançamento da Temporada" />
        <label htmlFor="director">Diretor:</label>
        <input type="text" id="director" name="director" defaultValue={serieParaEditar?.director} placeholder="Diretor" />
        <label htmlFor="producer">Produtora:</label>
        <input type="text" id="producer" name="producer" defaultValue={serieParaEditar?.producer} placeholder="Produtora" />
        <label htmlFor="category">Categoria:</label>
        <input type="text" id="category" name="category" defaultValue={serieParaEditar?.category} placeholder="Categoria" />
        <label htmlFor="watchedDate">Data em que assistiu:</label>
        <input type="date" id="watchedDate" name="watchedDate" defaultValue={serieParaEditar?.watchedDate} placeholder="Data em que assistiu" />
        <button type="submit"> {id ? 'Salvar Alterações' : 'Adicionar Série'}</button>
      </form>
    </div>
  )
}

export default SerieForm