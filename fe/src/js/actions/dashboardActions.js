const IMAGENET_CLASSSES = require('../../../classlist/imagenet1000');

export function loadModel() {
	return (dispatch, getState) => {
		const savedModel = localStorage.getItem('mobilenet');
		dispatch({type: 'TF_MODEL_LOAD_START'});
		if(savedModel) {
			tf.loadModel('indexeddb://mobilenet').then((model)=>{
				console.log('Indexed DB model being loaded ::');
				dispatch({type: 'TF_MODEL_LOAD_SUCCESS', model});
			})
		} else {
			tf.loadModel('http://127.0.0.1:8887/mobilenet/model.json?static=1').then((model)=>{
				console.log('TF model being loaded for the first time ::');
				localStorage.setItem('mobilenet', true);
				model.save('indexeddb://mobilenet')
				dispatch({type: 'TF_MODEL_LOAD_SUCCESS', model});
			})
		}
	}
}

export function predictImage(image) {
	return (dispatch, getState) => {
		const {model} = getState().dashboardState;
		/* 
		//VGG16 model
		let meanImageNetRGB = tf.tensor1d([123.68, 116.779, 103.939]);
		let tensor = tf.fromPixels(image)
			.resizeNearestNeighbor([224, 224])
			.toFloat()
			.sub(meanImageNetRGB)
			.reverse(2)
			.expandDims();
		*/
		let offset = tf.scalar(127.5);
		let tensor = tf.fromPixels(image)
			.resizeNearestNeighbor([224, 224])
			.toFloat()
			.sub(offset)
			.div(offset)
			.expandDims();

		model.predict(tensor).data().then(predictions =>{
			let top5 = Array.from(predictions)
				.map((p, i)=>{
					return {
						probability: p,
						className: IMAGENET_CLASSSES[i]
					}
				}).sort((a, b)=>{
					return b.probability - a.probability;
				}).slice(0, 5);
			dispatch({type: 'TF_PREDICTION_SUCCESS', predictions: top5})
		})
	}
}
export function resetPredictions() {
	return (dispatch, getState) => {
		dispatch({type: 'TF_PREDICTION_RESET'})
	}
}
