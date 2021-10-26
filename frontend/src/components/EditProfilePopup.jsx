import React from "react";
import { PopupWithForm } from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export const EditProfilePopup = (props) => {
  const [name, setName] = React.useState("");
  const [info, setInfo] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setInfo(currentUser.about);
  }, [currentUser, props.isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onUpdateUser({
      name: name,
      about: info,
    });
  };

  const onChangeName = (evt) => {
    setName(evt.target.value);
  };

  const onChangeInfo = (evt) => {
    setInfo(evt.target.value);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoad ? "Сохранение..." : "Сохранить"}
    >
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_value_name"
          name="name"
          id="name-profile"
          type="text"
          value={name || ""}
          placeholder="Имя"
          minLength="2"
          maxLength="30"
          required
          onChange={onChangeName}
        />
        <p id="name-profile-error" className="error"></p>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__input popup__input_value_job"
          name="info"
          id="job-profile"
          type="text"
          value={info || ""}
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          required
          onChange={onChangeInfo}
        />
        <p id="job-profile-error" className="error"></p>
      </div>
    </PopupWithForm>
  );
};
