import axios from 'axios';

class HttpClientService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  createRequestParameters(requestParameters) {
    return {
      method: 'GET',
      headers: requestParameters.Headers,
    };
  }

  async getAsync(requestParameters) {
    const url = this.createRequestParameters({
      action: requestParameters.Action,
      controller: requestParameters.Controller,
      folder: requestParameters.Folder,
      queryString: requestParameters.QueryString
    });

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: requestParameters.Headers || {}
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      const optResult = jsonResponse;

      if (!optResult.Succeeded) {
        throw new Error(`Request failed with message: ${optResult.Message}`);
      }

      return optResult;
    } catch (error) {
      console.error("API çağrısında bir hata oluştu:", error);
      throw error;
    }
  }

  createRequestParameters({ action, controller, folder, queryString }) {
    const baseUrl = this.baseUrl;
    return `${baseUrl}/${folder}/${controller}/${action}?${queryString}`;
  }

  toQueryString(params) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  }

  url(requestParameters) {
    return `${requestParameters.baseUrl ? requestParameters.baseUrl : this.baseUrl}/${requestParameters.folder}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
  }

  get(requestParameters, id) {
    let url = "";

    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${id ? `/${id}` : ""}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }

    return axios.get(url, {
      headers: requestParameters.headers
    });
  }

  post(requestParameters, body) {
    let url = "";

    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }

    return axios.post(url, body, {
      headers: requestParameters.headers
    });
  }

  put(requestParameters, body) {
    let url = "";

    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }

    return axios.put(url, body, {
      headers: requestParameters.headers
    });
  }

  delete(requestParameters, id) {
    let url = "";

    if (requestParameters.fullEndpoint) {
      url = requestParameters.fullEndpoint;
    } else {
      url = `${this.url(requestParameters)}/${id}${requestParameters.queryString ? `?${requestParameters.queryString}` : ""}`;
    }

    return axios.delete(url, {
      headers: requestParameters.headers
    });
  }
}

const RequestParameters = {
  folder: '',
  controller: '',
  action: '',
  queryString: '',
  headers: {},
  baseUrl: '',
  fullEndpoint: ''
};

export { HttpClientService, RequestParameters };
