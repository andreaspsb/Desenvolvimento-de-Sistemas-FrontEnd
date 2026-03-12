import type { Serie } from "../../types"

type SerieFormProps = {
  onAdd: (nova: Serie) => void
}

function SerieForm({ onAdd }: SerieFormProps) {

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

    onAdd(newSerie);
    event.currentTarget.reset();
  }

  return (
    <div className="serie-form">
      <h2>Formulário de Séries</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" placeholder="Título" />
        <label htmlFor="seasons">Número de Temporadas:</label>
        <input type="number" id="seasons" name="seasons" placeholder="Número de Temporadas" />
        <label htmlFor="releaseDate">Data de Lançamento da Temporada:</label>
        <input type="date" id="releaseDate" name="releaseDate" placeholder="Data de Lançamento da Temporada" />
        <label htmlFor="director">Diretor:</label>
        <input type="text" id="director" name="director" placeholder="Diretor" />
        <label htmlFor="producer">Produtora:</label>
        <input type="text" id="producer" name="producer" placeholder="Produtora" />
        <label htmlFor="category">Categoria:</label>
        <input type="text" id="category" name="category" placeholder="Categoria" />
        <label htmlFor="watchedDate">Data em que assistiu:</label>
        <input type="date" id="watchedDate" name="watchedDate" placeholder="Data em que assistiu" />
        <button type="submit">Adicionar Série</button>
      </form>
    </div>
  )
}

export default SerieForm