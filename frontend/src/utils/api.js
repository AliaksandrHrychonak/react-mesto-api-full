class Api {
  constructor(config){
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,  
    })
    .then(this._handleResponce);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._handleResponce);
  }

  setUserInfo( data ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._handleResponce);
  }

  postCard( data ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._handleResponce);
  }
  
  setAvatar( data ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleResponce);
  }

  deleteCard( cardId ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponce);
  }

  toggleLikeCard( cardId, isLiked ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._handleResponce);
  }
}

export const api = new Api({
  baseUrl: "https://api.alexgrichenokmesto.nomoredomains.monster",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});
