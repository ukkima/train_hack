import classNames from "classnames";
import cls from "./button.module.scss";

const modClasses = {
  outline: cls.outline,
  fill: cls.fill,
};

const widthClasses = {
  mini: cls.mini,
  full: cls.full,
};

export const Button = (props) => {
  const { mod = "fill", width = "mini", children, ...rest } = props;

  const classes = [mod && modClasses[mod], width && widthClasses[width]];

  return (
    <button className={classNames(cls.button, classes)} {...rest}>
      {children}
    </button>
  );
};
