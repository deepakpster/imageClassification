import request from 'superagent';
import appConfig from '../config';

const API_BASE = appConfig.apiBase;

export function predictImage(file) {
	var formData = new FormData();
	formData.append("image", file);
	return new Promise((resolve, reject) => {
		request.post(`${API_BASE}/api/predict`)
			.send(formData)
			.end((err, res) => {
				if (err) {
					reject(res.body);
					return;
				}
				resolve(res.body);
			});
	});
}