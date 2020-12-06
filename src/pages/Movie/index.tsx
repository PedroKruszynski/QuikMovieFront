import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';
import Moment from 'moment';

import api from '../../services/api';

import { Header, MovieInfo, ProductionInfo } from './styles';

interface IMovieParams {
  movie_id: string;
  movie_name: string;
}

interface IMovies {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: string;
  vote_count: string;
  genres: [
    {
      id: string,
      name: string
    }
  ];
  production_companies: [
    {
      id: string;
      name: string;
    }
  ]
}

const Movie: React.FC = () => {
  const [movie, setMovie] = useState<IMovies | null>(null);

  const { params } = useRouteMatch<IMovieParams>();

  useEffect(() => {
    api.get(`/movie/${params.movie_id}`).then((response) => {
      setMovie(response.data);
    });
  }, [params.movie_id]);

  return (
    <>
      <Header>
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {movie ? (
        <>
          <MovieInfo>
            <header>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={`poster_image ${movie.title}`}
              />
              <div>
                <p>
                  <strong>
                    {movie.title}
                  </strong>
                  <span>
                      {`(${Moment(movie.release_date).format("DD/MM/YYYY")})`}
                    </span>
                </p>
                <p>{movie.overview}</p>
                <p>
                  {movie.genres.map((genre) => (
                    <span>
                      {`[${genre.name}] `}
                    </span>
                  ))}
                </p>
              </div>
            </header>
            <ul>
              <li>
                <strong>{movie.vote_average}</strong>
                <span>Nota</span>
              </li>
              <li>
                <strong>{movie.vote_count}</strong>
                <span>Quant. Votos</span>
              </li>
            </ul>
          </MovieInfo>
          <ProductionInfo>
            <strong>Produtoras:</strong>
            <div>
              {movie.production_companies.map((companie, index) => {
                if (index !== movie.production_companies.length - 1)
                  return (
                    <strong key={companie.id}>
                        {`${companie.name} - `}
                    </strong>
                  )
                else
                  return (
                    <strong key={companie.id}>
                        {`${companie.name}`}
                    </strong>
                  )
              })}
            </div>
          </ProductionInfo>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
};

export default Movie;
