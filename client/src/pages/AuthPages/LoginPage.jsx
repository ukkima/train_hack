import { Button, Input } from "src/components";
import cls from "./auth.module.scss";
import { Link } from "react-router";
import { registerLink } from "src/consts";

export const LoginPage = () => {
  return (
    <div className={cls.auth}>
      <h2 className={cls.title}>Вход</h2>
      <form className={cls.form}>
        <Input label="Почта" />
        <Input label="Пароль" isPassword={true} />
        <Button>Войти</Button>
      </form>
      <p className={cls.message}>
        Нет аккаунта?{" "}
        <Link to={registerLink()} className={cls.link}>
          Зарегестрироваться
        </Link>
      </p>
    </div>
  );
};
