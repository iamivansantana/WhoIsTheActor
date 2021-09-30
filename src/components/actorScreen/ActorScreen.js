import { types } from '../../types/types';
import React, { useEffect, useState } from 'react';
import { Button, Image, Tag } from 'antd';
import { ArrowLeftOutlined, StarFilled } from '@ant-design/icons';
import MovieCard from '../moviesCards/MovieCard';
import './ActorScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
const axios = require('axios').default;

const ActorScreen = ({ history }) => {
	//Estado de error
	const [errorState, setErrorState] = useState(false);

	//se utiliza el hook useParams() para obtener/acceder a los parametros del path
	//se desestructura actorId
	const { actorId } = useParams();

	//Suscripciones al estado en el store
	const actor = useSelector((state) => state.actor);
	const movies = useSelector((state) => state.movies);
	const movieDetails = useSelector((state) => state.movieDetails);
	//Dispatch para mandar actions y payloads al state
	const dispatch = useDispatch();

	//Efecto que controla las peticiones a la api de themoviedb
	useEffect(() => {
		//Metodo para hacer la peticion a la API
		const getMovies = async () => {
			const API_key = '03e24162caecebf27726854d662383c7';

			// se asigna a query el parametro obtenido del path
			const query = actorId;
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/search/person?api_key=${API_key}&query=${query}`
				);
				//Actualizacion del estado inicial
				dispatch({
					type: types.updateActor,
					payload: response.data.results[0],
				});
				dispatch({
					type: types.updateMovies,
					payload: response.data.results[0].known_for,
				});
				dispatch({
					type: types.updateMovieDetails,
					payload: response.data.results[0].known_for[0],
				});
			} catch (error) {
				console.error(error);
				//Cambio de estado Error a true si hay algun error en la peticion
				setErrorState(true);
			}
		};

		//Ejecuta el metodo
		getMovies();
	}, [actorId, dispatch]);

	//Mtodo que se ejecuta al hacer clic en el boton return.
	const handleReturn = () => {
		//Condiciona si el historial de navegacion es menor igual a 2 hal hacer clic te agrega al path '/'.
		if (history.length <= 2) {
			history.push('/');
		} else {
			//Si el tamaño del historial es mayor te lleva a la pagina anterior.
			history.goBack();
		}
	};

	return (
		<>
			{/* operador condicional ternario para motrar codigo en caso de error en peticion API */}
			{errorState || !actor || !movies || !movieDetails ? (
				<div
					className='flex flex-column'
					style={{ backgroundColor: 'var(--primaryColor)' }}
				>
					<div
						style={{
							padding: '2rem',
							borderBottom: '1px solid var(--borderPrimaryColor)',
						}}
					>
						<Button onClick={handleReturn} type='primary'>
							<ArrowLeftOutlined />
							Regresar
						</Button>
					</div>
					<div className='flex flex-center'>
						<span style={{ fontSize: '2rem', textAlign: 'center' }}>
							No se han encontrado resultados.
						</span>
					</div>
				</div>
			) : (
				// Pantalla de Detalle de actor
				<div
					className='flex flex-column'
					style={{ backgroundColor: 'var(--primaryColor)' }}
				>
					<div className='actor-grid'>
						<div className='grid-area-back' style={{ padding: '1rem' }}>
							<Button onClick={handleReturn} type='primary'>
								<ArrowLeftOutlined />
								Regresar
							</Button>
						</div>
						{/* Seccion de Informacion del actor */}
						<div className='grid-area-actor'>
							{actor.profile_path ? (
								<Image
									className='actor-img'
									src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
								/>
							) : null}

							<div className='text-tittle text-bold'>{actor.name}</div>

							{actor.gender === 1 ? (
								<Tag color='gold'>Mujer</Tag>
							) : (
								<Tag color='gold'>Hombre</Tag>
							)}

							<div className='text-subtittle'>Popularidad: {actor.popularity}</div>
						</div>
						{/* Seccion de catalogo de peliculas */}
						<div
							className='grid-area-movies flex flex-column'
							style={{ padding: '1rem' }}
						>
							<div className='text-tittle text-bold'>PELICULAS</div>
							<div className='carruselContainer'>
								<div className='sliderCarousel flex flex-aling-center'>
									{movies.map((card) => (
										<MovieCard key={card.id} card={card} />
									))}
								</div>
							</div>
						</div>
						{/* Seccion de detalle de pelicula */}
						<div
							className='grid-area-descTittle flex flex-justify-between'
							style={{
								padding: '1.5rem 1rem 1.5rem 3rem',
								borderTop: '1px solid var(--borderPrimaryColor)',
							}}
						>
							<div className='text-tittle text-bold'>{movieDetails.title}</div>

							<div className='text-tittle' style={{ textAlign: 'center' }}>
								{movieDetails.vote_average}/10{' '}
								<StarFilled style={{ color: '#ffd700' }} />
							</div>
						</div>
						<div
							className='grid-area-descImg flex flex-center'
							style={{ paddingBottom: '2rem' }}
						>
							<div className='img-container'>
								{movieDetails.poster_path ? (
									<img
										className='img-cover'
										src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
										alt='img'
									/>
								) : null}
							</div>
						</div>
						<div className='grid-area-descText flex flex-column flex-center'>
							<div className='text-subtittle text-justify'>
								{movieDetails.overview}
							</div>
							<div className='text-subtittle text-bold'>Fecha de estreno:</div>
							<div className='text-subtittle text-bold'>
								{movieDetails.release_date}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ActorScreen;
