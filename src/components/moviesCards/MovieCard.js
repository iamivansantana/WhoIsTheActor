import React from 'react';
import { Card } from 'antd';

const MovieCard = () => {
	const { Meta } = Card;
	return (
		<>
			<div className='flex flex-center' style={{ padding: '1rem' }}>
				<Card
					hoverable
					style={{
						width: 150,
						height: 260,
						overflow: 'hidden',
						scrollSnapAlign: 'end',
					}}
					cover={
						<img
							alt='example'
							src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
						/>
					}
				>
					<Meta description='Harry poter y el calix de fuego' />
				</Card>
			</div>
		</>
	);
};

export default MovieCard;
