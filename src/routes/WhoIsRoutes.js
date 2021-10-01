import React from 'react';
import { Suspense } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import ActorScreen from '../components/actorScreen/ActorScreen';
import WhoIsScreen from '../components/whoIsScreen/WhoIsScreen';

const WhoIsRoutes = () => {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Router>
					<Switch>
						{/* rutas de Portfolio */}
						<Route exact path='/' component={WhoIsScreen} />

						{/* Ruta de Project by Data */}
						<Route exact path='/:actorId' component={ActorScreen} />
						<Redirect to='/' />
					</Switch>
				</Router>
			</Suspense>
		</>
	);
};

export default WhoIsRoutes;
