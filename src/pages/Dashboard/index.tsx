import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Moment from 'moment';

import { Title, Form, Movies, Error } from './styles';

interface IMovies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genreList: string;
}

interface IGenres {
  id: number;
  name: string;
}

const Dashboard: React.FC = () => {
  const [newRequest, setNewRequest] = useState('');
  const [selectGenre, setSelectGenre] = useState('');
  const [inputError, setInputError] = useState('');

  const [movies, setMovies] = useState<IMovies[]>([]);
  const [genres, setGenres] = useState<IGenres[]>([]);

  useEffect(() => {

    api.get(`trending/all/day`).then((response) => {
      setMovies(response.data.results);
    });

    api.get(`genre/movie`).then((response) => {
      setGenres(response.data.genres);
    });

  }, []);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRequest && selectGenre === '') {
      setInputError('Digite o nome do filme');
      return;
    }

    try {

      const movie = {
        query: newRequest,
        with_genres: selectGenre
      };

      const route = (!newRequest && selectGenre !== '') ? 'discover/movie' : 'search/movie';

      const response = await api.get(route, { params: movie });

      const newMovies = response.data.results;

      setMovies([...newMovies]);

      newMovies.length !== 0 ? setInputError('') : setInputError('Nenhum filme encontrado');

      setNewRequest('');
    } catch (error) {
      setInputError('Erro na busca por esse filme');
    }
  }

  return (
    <>
      <Title>Explore filmes no QuikMovie</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <select defaultValue={'DEFAULT'} onChange={(e) => setSelectGenre(e.target.value)}>
          <option value="DEFAULT" disabled>
            Gêneros
          </option>
          {genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
              >
                {genre.name}
            </option>
          ))}
        </select>
        <input
          value={newRequest}
          onChange={(e) => setNewRequest(e.target.value)}
          placeholder="Digite o nome do filme"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      { movies && (
        <Movies>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/repositories/${movie.title}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                alt={movie.title}
              />
              <div>
                <strong>{movie.title}</strong>
                <p>{movie.overview}</p>
                <p>Data de lançamento: {Moment(movie.release_date).format("DD/MM/YYYY")}</p>
                <p>Gêneros: {movie.genreList}</p>
              </div>

              <FiChevronRight size={20} />
            </Link>
          ))}
        </Movies>
      )}
    </>
  );
};

export default Dashboard;
