import React from "react";
import { PopupWithForm } from "./PopupWithForm";

export const EditAvatarPopup = (props) => {
  const avatarRefInput = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRefInput.current.value,
    });
  }
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.isLoad ? "Сохранение..." : "Сохранить"}
    >
      <div className="popup__input-container">
        <input
          ref={avatarRefInput}
          className="popup__input popup__input_value_avatar"
          id="avatar-card"
          name="avatar"
          type="url"
          defaultValue=""
          placeholder="Ссылка"
          required
        />
        <p id="avatar-card-error" className="error"></p>
      </div>
    </PopupWithForm>
  );
};
