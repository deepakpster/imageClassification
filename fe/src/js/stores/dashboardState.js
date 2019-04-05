// @flow

const initialState = {
	modelLoadState: 0, // 0 - init state, 1 - in Progress, 2 - success, -1 - failure
	model: null,
	predictions: null
};

export default(state = initialState, action) => {
	switch (action.type) {
		case 'TF_MODEL_LOAD_START':
			return { ...state, modelLoadState: 1}
		case 'TF_MODEL_LOAD_SUCCESS':
			return { ...state, modelLoadState: 2, model: action.model}
		case 'TF_PREDICTION_SUCCESS':
			return { ...state, predictions: action.predictions}
		case 'TF_PREDICTION_RESET':
			return { ...state, predictions: null}
		default:
			return { ...state };
	}
};
