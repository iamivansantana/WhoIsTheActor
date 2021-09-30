import { types } from '../../types/types';
import React from 'react';
import { Card } from 'antd';
import { useDispatch } from 'react-redux';

const MovieCard = ({ card }) => {
	// Dispatch para mandat actions y payload al estado
	const dispatch = useDispatch();
	// funcion para updateMovieDetails al hacer clic en una tarjeta de pelicula
	const actualizarMovieDetails = () => {
		dispatch({ type: types.updateMovieDetails, payload: card });
	};
	//Extrae Etiqueta Meta de card from antd
	const { Meta } = Card;

	return (
		<>
			<div className='flex flex-center' style={{ padding: '1rem' }}>
				<Card
					onClick={actualizarMovieDetails}
					hoverable
					style={{
						width: 180,
						height: 340,
						overflow: 'hidden',
						scrollSnapAlign: 'end',
					}}
					cover={
						<img
							alt='example'
							src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
						/>
					}
				>
					<Meta description={card.title} />
				</Card>
			</div>
		</>
	);
};

export default MovieCard;
