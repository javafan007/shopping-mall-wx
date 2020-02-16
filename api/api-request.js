import Constants from '../utils/Constants';

const request = function(url, opts={}) {
  return new Promise((resolve, reject) => {
    const config = { url, ...opts };
    config.success = function ({ data }) {
			if(opts.interceptors.response) {
				opts.interceptors.response(data, opts);
			}
      resolve(data.info);
    };
    config.fail = function(res) {
      reject(res);
    };

    // 请求拦截器
    if(opts.interceptors.request) {
			opts.interceptors.request(config);
    }

    wx.request(config);
  });
};

class Request {
  domain = '';
  prefix = '';
  header = {};
  interceptors = {};

  setDomain(domain) {
    this.domain = domain;
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  setHeader(header) {
    this.header = header;
  }

  setInterceptors(interceptors) {
    this.interceptors = interceptors;
  }

  get (url, opts) {
    return request(this._getRequestUrl(url), this._getRequestConfig('get', opts));
  }

  post (url, opts) {
    return request(this._getRequestUrl(url), this._getRequestConfig('post', opts));
  }

  put (url, opts) {
    return request(this._getRequestUrl(url), this._getRequestConfig('put', opts));
  }

  delete (url, opts) {
    return request(this._getRequestUrl(url), this._getRequestConfig('delete', opts));
  }

  _getRequestConfig (method, opts = {}) {
    const config = { ...opts };
    config.method = method;
    config.header = { ...this.header, ...(opts.header || {}) };
    config.interceptors = {...this.interceptors, ...(opts.interceptors || {})};
    return config;
  }

  _getRequestUrl (url) {
    return this.domain + this.prefix + url;
  }
}

const api = new Request();
api.setDomain(Constants.API_HOST);
api.setPrefix('/');
api.setHeader({ commonHeader: 'hhhhh' });

const soltm = '6e79e1a1-3251-4a1a-a48f-3907d7311f23';
const solto = '3e139328-ce0c-41c1-a521-f7461ae3324f';
api.setInterceptors({
  request: (config) => {
		config.url += (config.url.indexOf('?') > -1 ? '&' : '?') + 'soltm=' + soltm + '&solto=' + solto;
  }
});

module.exports= api;
  
  