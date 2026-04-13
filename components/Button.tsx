import { ButtonHTMLAttributes, FC, MouseEventHandler, ReactNode } from "react";

import { cn } from "@/lib/tailwind";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  color?: TColor;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

type TColor =
  | "orange"
  | "green"
  | "blue"
  | "gray"
  | "amber"
  | "red"
  | "purple"
  | "emerald";

const colorVariants = {
  orange: "text-orange-600 bg-orange-50 hover:bg-orange-100",
  green: "text-green-600 bg-green-50 hover:bg-green-100",
  blue: "text-blue-600 bg-blue-50 hover:bg-blue-100",
  gray: "text-gray-600 bg-gray-50 hover:bg-gray-100",
  amber: "text-amber-600 bg-amber-50 hover:bg-amber-100",
  red: "text-red-600 bg-red-50 hover:bg-red-100",
  purple: "text-purple-600 bg-purple-50 hover:bg-purple-100",
  emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
};

const Button: FC<IButtonProps> = ({
  children,
  color = "blue",
  className = "",
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={typeof onClick === "function" ? onClick : undefined}
      className={cn(
        `p-2.5 px-4 rounded-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 font-bold`,
        colorVariants[color],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
