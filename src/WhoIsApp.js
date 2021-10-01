import React from 'react';
import { Suspense } from 'react';
// import WhoIsRoutes from './routes/WhoIsRoutes';
const WhoIsRoutes = React.lazy(() => import('./routes/WhoIsRoutes'));

function WhoIsApp() {
	return (
		<>
			<div className='body'>
				<div className='containerProject'>
					<Suspense fallback={<div>Loading...</div>}>
						<WhoIsRoutes />
					</Suspense>
				</div>
			</div>
		</>
	);
}

export default WhoIsApp;
