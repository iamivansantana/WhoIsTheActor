import { createStore } from 'redux';
import { types } from '../types/types';

//Estado inicial
const initialState = {
	actor: {},
	movies: [],
	movieDetails: {},
};

//Función Reducer
//Recibe como parámetro el estado inicial y un action
const actorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.updateActor:
			return { ...state, actor: action.payload };

		case types.updateMovies:
			return { ...state, movies: action.payload };

		case types.updateMovieDetails:
			return { ...state, movieDetails: action.payload };

		default:
			return state;
	}
};

const store = createStore(actorReducer);
export default store;
