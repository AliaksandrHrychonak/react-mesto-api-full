import React from "react";
import useForm from '../hooks/useForm'
export const Login = ({onSubmit}) => {
  const { values, handleChange, errors, isValid, resetForm } = useForm()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(isValid) {
      onSubmit(values.email, values.password)
      resetForm()
    } 
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
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        {errors.email && <span className="access__input-error">{errors.email}</span>}
        </div>
        <div className="access__box-input access__box-input_type_margin">
          <input
            id="pas-log"
            type="password"
            name="password"
            className="access__input"
            placeholder="Пароль"
            value={values.password || ""}
            minLength={8}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="access__input-error">{errors.password}</span>}
        </div>
        
        <button disabled={!isValid} className={`access__button-submit ${!isValid && 'access__button-submit_type_disabled'}`} type="submit">
          Войти
        </button>
      </form>
    </section>
  );
};
