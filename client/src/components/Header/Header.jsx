import { Button } from "src/components";
import cls from "./header.module.scss";
import { Link } from "react-router";
import { homeLink, loginLink } from "src/consts";

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.header_wrapper}>
          <Link className={cls.logo} to={homeLink()}>
            Ваше лого :)
          </Link>

          <Link to={loginLink()}>
            <Button>Вход и регистрация</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
