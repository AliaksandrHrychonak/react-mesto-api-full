class Auth {
  constructor(config) {
    this._baseUrl = config.baseUrl; 
    this._headers = config.headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  registration = ( email, password ) => {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponce)
  }; 

  authorization = (email, password) => {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password })
    })
    .then(this._handleResponce)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
  };

  getToken = (token) => {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._handleResponce)
  }
}

export const auth = new Auth({
  baseUrl: "https://api.alexgrichenokmesto.nomoredomains.monster",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})