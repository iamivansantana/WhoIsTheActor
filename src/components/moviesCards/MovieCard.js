import React from 'react';
import { Card } from 'antd';

const MovieCard = ({ card }) => {
	const { Meta } = Card;
	return (
		<>
			<div className='flex flex-center' style={{ padding: '1rem' }}>
				<Card
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
