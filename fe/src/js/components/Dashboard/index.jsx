import React from 'react';
import styles from './styles.scss';

export default class DashboardComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
      photo:null,
			photoURL: null
    }
		this.photoRef = null;
		this.onPhotoChange = this.onPhotoChange.bind(this);
	}
	loadLocalImage(filename) {
		return new Promise((res,rej)=>{
			imageGet(filename, (err, info) => {
				if(err){
					rej(err);
					return;
				}
				res(info.data);
			});
		})
	}
	onPhotoChange(e) {
		const photo = e.target.files[0];
		const photoURL = URL.createObjectURL(photo);
		this.setState({
			photo,
			photoURL,
		}, ()=>{
			setTimeout(()=>{
				this.props.dashboardActions.predictImage(this.photoRef)
			}, 50)
		})
	}

	render() {
		const {photo, photoURL} = this.state;
		const {dashboardState} = this.props;
		const {modelLoadState, predictions} = dashboardState;
		return (
			<div className="container">
				<nav className="navbar navbar-expand-lg">
					<a className="navbar-brand" href="#">MobileNet</a>
				</nav>
				{
					(modelLoadState == 1) ? <div className="spinner-border text-danger" role="status">
						<span className="sr-only">Loading...</span>
					</div>
					: (modelLoadState == 2) ?
						<div className="alert alert-success alert-dismissible fade show" role="alert">
							Model loaded successfully.
							<button type="button" className="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					: <div></div>
				}
				<div className="jumbotron jumbotron-fluid">
					<div className={`col`}>
						<h2>Select a photo</h2>
					</div>
					<div className={`form-inline ${styles.formInline}`}>
						<div className={`form-group ${styles.formGroup}`}>
							<input type="file" className="form-control-file" id="testImage" onChange={this.onPhotoChange}/>
						</div>
						{/* <div className={`form-group`}>
							<button disabled={!photoURL} className="btn btn-primary" onClick={()=>{this.props.dashboardActions.predictImage(this.photoRef)}}>Predict</button>
						</div> */}
					</div>
				</div>
				<hr/>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-sm-6">
							<div className="card">
								<div className="card-header">
									Preview
								</div>
								<div className="card-body">
									{photoURL ? 
										<img className="img-fluid rounded" ref={(ref)=>{this.photoRef = ref}} src={photoURL} alt=""/>
										:
										<span>No photo selected to preview</span>
									}
								</div>
							</div>
						</div>
						<div className="col-md-6 col-sm-6">
							<div className="card">
								<div className="card-header">
									Predictions
								</div>
								<div className="card-body">
									{
										!predictions ? <span>Prediction not available</span>
										: <table className="table table-sm table-responsive-sm">
											<thead>
												<tr>
													<th scope="col">#</th>
													<th scope="col">Label</th>
													<th scope="col">Score</th>
												</tr>
											</thead>
											<tbody>
												{
													predictions && predictions.map((pred, predIndex) => {
														const {className, probability} = pred;
														const score = probability.toFixed(2);
														const trClass = (score>0.8) ? "table-success" : (score > 0.5) ? "table-info" : (score <= 0.1) ? "table-danger" : "";
														return (
															<tr key={`pred-${predIndex}-${probability}`} className={trClass}>
																<th scope="row">{predIndex+1}</th>
																<td>{className}</td>
																<td>{score}</td>
															</tr>
														)
													})
												}
											</tbody>
										</table>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
      </div>
		);
	}
}
