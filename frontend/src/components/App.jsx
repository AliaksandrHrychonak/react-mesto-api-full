import "../index.css";
import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditProfilePopup } from "./EditProfilePopup";
import { ImagePopup } from "./ImagePopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { Login } from "./Login";
import { Register } from "./Register";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { auth } from "../utils/auth";
import { InfoTooltip } from "./InfoTooltip";
import { Loader } from "./Loader";

export function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false)
  const history = useHistory();
  //API
  React.useEffect(() => {
    setisLoading(true)
    Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, user]) => {
      setCards(cards);
      setCurrentUser(user);
    })
    .catch((err) => console.log(err))
    .finally(() => setisLoading(false));
  }, [loggedIn]);

  React.useEffect(() => {
    setisLoading(true)
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.getToken(jwt)
      .then((res) => {
        if (res) {
          handleLogIn(true);
          setUserEmail(res.email);
          history.push("/");
        }
      })
      .catch((err) => {
        handleLogIn(false);
        if (err.status === 400) {
          console.log('400 — Токен не передан или передан не в том формате')
          return
        }
        if (err.status === 401) {
          console.log("401 — Переданный токен некорректен")
          return
        }
        console.log(err)
      })
    }
  }, [history]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .toggleLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    setIsLoad(false);
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
        setCardToDelete(null);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(true);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoad(true);
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoad(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(true);
    localStorage.removeItem('jwt');
    setUserEmail(null);
  };

  const handleTooltipOpen = () => {
    setIsInfoTooltipPopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsLoad(false);
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsLoad(false);
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsLoad(false);
    setAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIsLoad(false);
    setCardToDelete(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsLoad(false);
    setIsInfoTooltipPopupOpen(false);
  };

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoad(true);
    api
      .postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleRegistration = (email, password) => {
    auth
      .registration(email, password)
      .then((res) => {
        handleTooltipOpen();
        if (res) {
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        handleTooltipOpen();
        if(err.status === 400){
          console.log('не передано одно из полей')
          return
        }
        console.log(err);
      });
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorization(email, password)
      .then((res) => {
        if (res) {
          setUserEmail(email);
          handleLogIn(true);
          history.push("/")
        }
      })
      .catch((err) => {
        if(err.status === 400){
          console.log("400 - не передано одно из полей")
          return
        }
        if (err.status === 401){
          console.log("401 - пользователь с email не найден")
          return
        }
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} handleLogOut={handleLogOut}/>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />
          
          <Route path="/sign-in">
            <Login
              onSubmit={handleAuthorization}
              handleLogIn={handleLogIn}
              handleTooltipOpen={handleTooltipOpen}
            />
          </Route>

          <Route path="/sign-up">
            <Register onSubmit={handleRegistration}/>
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
        <Loader isLoading={isLoading}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeleteCardPopup
          card={cardToDelete}
          onClose={closeAllPopups}
          onClick={handleCardDelete}
          isLoad={isLoad}
        />
        <InfoTooltip
          loggedIn={loggedIn}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
