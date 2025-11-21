import { Button, Input } from "src/components";
import cls from "./auth.module.scss";
import { Link } from "react-router";
import { loginLink } from "src/consts";

export const RegisterPage = () => {
  return (
    <div className={cls.auth}>
      <h2 className={cls.title}>Регистрация</h2>
      <form className={cls.form}>
        <Input label="Имя и фамилия" />
        <Input label="Почта" />
        <Input label="Имя пользователя" />
        <Input label="Пароль" isPassword={true} />
        <Button>Зарегестрироваться</Button>
      </form>
      <p className={cls.message}>
        Есть аккаунт?{" "}
        <Link to={loginLink()} className={cls.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
