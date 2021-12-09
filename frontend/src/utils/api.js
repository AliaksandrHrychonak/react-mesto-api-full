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

  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      }, 
    })
    .then(this._handleResponce);
  }

  getUserInfo(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${jwt}`,
      },
    })
    .then(this._handleResponce);
  }

  setUserInfo( data, token ) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
    .then(this._handleResponce);
  }

  postCard( data, token ) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._handleResponce);
  }
  
  setAvatar( data, token ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then(this._handleResponce);
  }

  deleteCard( cardId, token ) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
    .then(this._handleResponce);
  }

  toggleLikeCard( cardId, isLiked, token ) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`,
      },
    })
      .then(this._handleResponce);
  }
}

export const api = new Api({
  baseUrl: "https://api.alexgrichenokmesto.nomoredomains.monster",
});
