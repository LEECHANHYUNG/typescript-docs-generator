type NativeButtonProps = React.ComponentPropsWithoutRef<"button">;

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export type ButtonProps = NativeButtonProps & CustomButtonProps;

export const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) => {
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
