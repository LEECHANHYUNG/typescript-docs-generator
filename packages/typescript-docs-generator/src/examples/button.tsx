import React from "react";

type NativeButtonProps = React.ComponentPropsWithoutRef<"button">;

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

type ButtonProps = NativeButtonProps & CustomButtonProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-variant={variant}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
