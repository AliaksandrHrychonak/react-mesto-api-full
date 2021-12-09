import React from "react";
import { Link } from "react-router-dom";
import useForm from '../hooks/useForm'

export const Register = ({ onSubmit }) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm()

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(isValid) {
      onSubmit(values.email, values.password)
      resetForm()
    }
  };

  return (
    <section className="access">
      <form onSubmit={handleSubmit} className="access__form">
        <h1 className="access__title">Регистрация</h1>
        <div className="access__box-input">
          <input
            id="mal-reg"
            type="email"
            name="email"
            className="access__input"
            placeholder="Email"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="access__input-error">{errors.email}</span>}
        </div>
        <div className="access__box-input access__box-input_type_margin">
          <input
            id="pas-reg"
            type="password"
            name="password"
            className="access__input"
            placeholder="Пароль"
            minLength="8"
            value={values.password || ''}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="access__input-error">{errors.password}</span>}
        </div>

        <button disabled={!isValid} className={`access__button-submit ${!isValid && 'access__button-submit_type_disabled'}`} type="submit">
          Зарегистрироваться
        </button>
      </form>

      <Link to="sign-in" className="access__login-link">
        <p className="access__option">Уже зарегистрированы? Войти</p>
      </Link>
    </section>
  );
};
