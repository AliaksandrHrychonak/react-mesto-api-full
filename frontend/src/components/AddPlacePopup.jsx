import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export const AddPlacePopup = (props) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  const onChangeName = (evt) => {
    setName(evt.target.value);
  };

  const onChangeLink = (evt) => {
    setLink(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  };

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.isLoad ? "Сохранение..." : "Создать"}
    >
      <div className="popup__input-container">
        <input
          onChange={onChangeName}
          className="popup__input popup__input_value_title"
          id="title-card"
          name="name"
          type="text"
          value={name || ""}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <p id="title-card-error" className="error"></p>
      </div>
      <div className="popup__input-container">
        <input
          onChange={onChangeLink}
          className="popup__input popup__input_value_image"
          id="link-card"
          name="link"
          type="url"
          value={link || ""}
          placeholder="Ссылка на картинку"
          required
        />
        <p id="link-card-error" className="error"></p>
      </div>
    </PopupWithForm>
  );
};
