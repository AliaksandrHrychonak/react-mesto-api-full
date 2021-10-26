import React from "react";
import { PopupWithForm } from "./PopupWithForm";
export const DeleteCardPopup = (props) => {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onClick(props.card);
  };

  return (
    <PopupWithForm
      name="delete"
      isOpen={props.card}
      buttonText={props.isLoad ? "Удаление" : "Да"}
      onSubmit={handleSubmit}
      onClose={props.onClose}
      title="Вы уверены?"
      titleTheme="popup__title_theme_delete"
    >
    </PopupWithForm>
  );
};
