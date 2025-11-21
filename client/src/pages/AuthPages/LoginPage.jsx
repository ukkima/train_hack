import { Button, Input } from "src/components";
import cls from "./auth.module.scss";

export const LoginPage = () => {
  return (
    <div className={cls.auth}>
      <h2 className={cls.title}>Вход</h2>
      <form className={cls.form}>
        <Input label="Почта" />
        <Input label="Пароль" isPassword={true} />
        <Button>Войти</Button>
      </form>
      <p>Нет аккаунта? Зарегестрироваться</p>
    </div>
  );
};
