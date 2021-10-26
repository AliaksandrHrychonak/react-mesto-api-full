import React from "react";

export const Login = ({onSubmit}) => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    onSubmit(email, password)
}

  return (
    <section className="access">
      <form onSubmit={handleSubmit} className="access__form">
        <h1 className="access__title">Вход</h1>
        <div className="access__box-input">
          <input
            id="mail-log"
            type="email"
            name="email"
            className="access__input"
            placeholder="Email"
            value={email || ""}
            onChange={handleEmail}
            required
          />
          <span className="access__input-error"></span>
        </div>
        <div className="access__box-input access__box-input_type_margin">
          <input
            id="pas-log"
            type="password"
            name="password"
            className="access__input"
            placeholder="Пароль"
            value={password || ""}
            onChange={handlePassword}
            required
          />
          <span className="access__input-error"></span>
        </div>
        
        <button className="access__button-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
};
