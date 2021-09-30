import { createStore } from 'redux';
import { types } from '../types/types';

//Inicializacion del Estado
const initialState = {
	actor: {},
	movies: [],
};

//Función Reducer
//Recibe como parámetro el estado inicial y un action
const actorReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.updateActor:
			// const { payload } = action;
			console.log(action.payload, 'from Store');
			return { ...state, actor: action.payload };

		case types.updateMovies:
			return { ...state, movies: action.payload };

		default:
			return state;
	}
};

const store = createStore(actorReducer);
export default store;
