// @flow

const API_BASE: string = 'http://localhost:3000/api';

class Config {
  apiBase: string;
  
  constructor(apiBaseUrl: string) {
  	this.apiBase = apiBaseUrl;
  }
}

const appConfig = new Config(API_BASE);

export default appConfig;
