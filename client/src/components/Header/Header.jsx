import { Button } from "src/components";
import cls from "./header.module.scss";
import { Link } from "react-router";
import { loginLink } from "src/consts";

export const Header = () => {
  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.header_wrapper}>
          <p className={cls.logo}>Ваше лого :)</p>

          <Link to={loginLink()}>
            <Button>Вход и регистрация</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
