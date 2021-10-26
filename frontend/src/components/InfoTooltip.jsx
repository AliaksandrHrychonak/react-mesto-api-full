import React from 'react';

export const InfoTooltip = (props) => {

  React.useEffect(() => {
    const handleEsc = (event) => {
       if (event.keyCode === 27) {
        props.onClose()
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [props]);

  return (
    <div className={`popup ${ props.isOpen ? "popup_opened" : " " }` } onMouseDown={props.onClose}>
      <div className="popup__container" onMouseDown={(evt) => {evt.stopPropagation()}}>
        <button
        className="popup__button-close"
        type="button"
        name="Close"
        aria-label="Закрыть"
        onClick={props.onClose}
        ></button>
        <div className={`popup__image-tooltip ${ props.loggedIn ? "popup__image-tooltip_type_done": "popup__image-tooltip_type_not" }`}></div>
        <h1 className="popup__title popup__title_theme_tooltip">{props.loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h1>
      </div>
    </div>
  );
}
