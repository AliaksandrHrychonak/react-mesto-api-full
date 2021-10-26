import logo from "../images/logo.svg";
import { Route, Switch, Link } from "react-router-dom";

export function Header(props) {
  return (
    <header className="header">
      <a href="/index.html" className="header__link" target="_blank">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>

      <Switch>
        <Route exact path="/">
          <div className="header__box-access">
            <p className="header__mail">{props.userEmail}</p>
            <Link
              to="/sign-in"
              onClick={props.handleLogOut}
              className="header__link header__link_type_access"
            >
              Выйти
            </Link>
          </div>
        </Route>

        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>

        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
