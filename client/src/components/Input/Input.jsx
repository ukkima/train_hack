import { useState } from "react";
import cls from "./input.module.scss";
import { Eye } from "lucide-react";
import classNames from "classnames";

export const Input = (props) => {
  const { value, label, name, isPassword } = props;
  const [password, setPassword] = useState(isPassword);

  return (
    <div className={cls.container}>
      <input
        name={name}
        value={value}
        type={password ? "password" : "text"}
        className={cls.input}
      />
      <label className={classNames(cls.label, value && cls.label_value)}>
        {label}
      </label>
      {value
        ? isPassword && (
            <button
              onClick={() => setPassword(!password)}
              className={cls.showPassword}
            >
              <Eye />
            </button>
          )
        : ""}
    </div>
  );
};
