import React from "react";
import { Card } from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const onEditAvatar = () => {
    props.onEditAvatar(props.onClick);
  };
  const onEditProfile = () => {
    props.onEditProfile(props.onClick);
  };
  const onAddPlace = () => {
    props.onAddPlace(props.onClick);
  };

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__item">
          <div className="profile__section">
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Фото профиля"
            />
            <div className="profile__avatar-edit" onClick={onEditAvatar}></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__info-title">{currentUser.name}</h1>
            <button
              className="profile__button-edit"
              type="button"
              name="Edit"
              aria-label="Редактировать"
              onClick={onEditProfile}
            ></button>
            <p className="profile__info-subtitle">{currentUser.about}</p>
          </div>
        </div>
        <div className="profile__item">
          <button
            className="profile__button-add"
            type="button"
            name="Add"
            aria-label="Добавить"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="elements">
        <div className="elements__item">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
