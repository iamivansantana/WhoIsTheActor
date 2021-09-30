import { types } from '../../types/types';
import React, { useEffect, useState } from 'react';
import { Button, Image, Tag } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MovieCard from '../moviesCards/MovieCard';
import './ActorScreen.css';
import { useDispatch, useSelector } from 'react-redux';
const axios = require('axios').default;

const ActorScreen = () => {
	const actor = useSelector((state) => state.actor);
	const movies = useSelector((state) => state.movies);

	const dispatch = useDispatch();

	const [actorValues, setActorValues] = useState({});
	const [moviesValues, setMoviesValues] = useState([]);

	useEffect(() => {
		// Want to use async/await? Add the `async` keyword to your outer function/method.
		const getMovies = async () => {
			const keyivan = '03e24162caecebf27726854d662383c7';
			// const key2 = '30db1237b9167f8afaf9e065b90d16b8';
			const query = 'megan fox';
			// const query = 'brad pitt';
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/search/person?api_key=${keyivan}&query=${query}`
				);
				setActorValues(response.data.results[0]);
				setMoviesValues(response.data.results[0].known_for);
			} catch (error) {
				console.error(error);
			}
		};

		getMovies();

		console.log('Ejecutando...');
	}, []);

	const actualizarActor = () => {
		dispatch({ type: types.updateActor, payload: actorValues });
		dispatch({ type: types.updateMovies, payload: moviesValues });
	};
	// console.log(actorValue);

	return (
		<>
			<div className='flex flex-column' style={{ backgroundColor: '#ffffff' }}>
				<div className='actor-grid'>
					<div className='grid-area-back' style={{ padding: '1rem' }}>
						<Button onClick={actualizarActor} type='primary'>
							<ArrowLeftOutlined />
							Regresar
						</Button>
					</div>
					<div className='grid-area-actor'>
						{actor.profile_path ? (
							<Image
								className='actor-img'
								// src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
								src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
							/>
						) : null}

						<div>{actor.name}</div>
						{actor.gender === 1 ? (
							<Tag color='gold'>Mujer</Tag>
						) : (
							<Tag color='gold'>Hombre</Tag>
						)}

						<div>Popularidad:{actor.popularity}</div>
					</div>
					<div
						className='grid-area-movies flex flex-column'
						style={{ padding: '1rem' }}
					>
						<div>PELICULAS</div>
						<div className='carruselContainer'>
							<div className='sliderCarousel flex flex-aling-center'>
								{movies.map((card) => (
									<MovieCard key={card.id} card={card} />
								))}
								{/* <MovieCard />
								<MovieCard />
								<MovieCard />
								<MovieCard />
								<MovieCard />
								<MovieCard /> */}
							</div>
						</div>
					</div>
					<div
						className='grid-area-descTittle flex flex-justify-around'
						style={{ padding: '1rem 0', borderTop: '1px solid #cccccc' }}
					>
						<div className='text-tittle text-bold'>Nombre</div>
						<div>Popularidad</div>
					</div>
					<div className='grid-area-descImg flex flex-center'>
						<div className='img-container'>
							<img
								className='img-cover'
								src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
								alt='img'
							/>
						</div>
					</div>
					<div className='grid-area-descText flex flex-column flex-center'>
						<div className='text-subtittle text-justify'>
							Fight Club (conocida como El club de la lucha en España y como El club de
							la pelea en Hispanoamérica) es una película satírica estadounidense de
							1999 basada en la novela homónima de Chuck Palahniuk. La cinta fue
							dirigida por David Fincher y protagonizada por Edward Norton, Brad Pitt y
							Helena Bonham Carter. Norton interpreta al protagonista, un "hombre
							común", cuyo nombre no se revela, aburrido con su profesión liberal en la
							sociedad estadounidense, que funda un "club de peleas" clandestino con un
							vendedor de jabones llamado Tyler Durden (interpretado por Brad Pitt), y
							se ve envuelto en una relación con Marla Singer, interpretada por Helena
							Bonham Carter.
						</div>
						<div className='text-subtittle text-bold'>Fecha de estreno</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActorScreen;
