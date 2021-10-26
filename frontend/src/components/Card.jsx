import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `elements__button-delete ${
    isOwn
      ? "elements__delete-button_type_visible"
      : "elements__delete-button_type_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__button-like ${
    isLiked ? "elements__button-like_active" : ""
  }`;

  const handleLikeClick = () => {
    props.onCardLike(props.card);
  };
  const handleClick = () => {
    props.onCardClick(props.card);
  };
  const handleDeleteClick = () => {
    props.onCardDelete(props.card);
  };

  return (
    <div className="template">
      <div className="elements__card">
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleDeleteClick}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="elements__image"
          onClick={handleClick}
        />
        <div className="elements__information">
          <h2 className="elements__title">{props.card.name}</h2>
          <div className="elements__container-like">
            <button
              onClick={handleLikeClick}
              className={cardLikeButtonClassName}
              type="button"
              name="Like"
              aria-label="Like"
            ></button>
            <p className="elements__quantity">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
