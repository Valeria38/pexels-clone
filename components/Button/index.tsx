"use client";
import { Button as HeadlessButton, ButtonProps } from "@headlessui/react";
import { FC, ReactNode } from "react";
import { cn } from "@/lib/tailwind";

type TColor =
  | "orange"
  | "green"
  | "blue"
  | "gray"
  | "amber"
  | "red"
  | "purple"
  | "emerald";

export interface IButtonProps extends ButtonProps {
  children: ReactNode;
  color?: TColor;
  className?: string;
}

const colorVariants: Record<TColor, string> = {
  orange:
    "text-orange-600 bg-orange-50 data-[hover]:bg-orange-100 border-orange-200",
  green:
    "text-green-600 bg-green-50 data-[hover]:bg-green-100 border-green-200",
  blue: "text-blue-600 bg-blue-50 data-[hover]:bg-blue-100 border-blue-200",
  gray: "text-gray-600 bg-gray-50 data-[hover]:bg-gray-100 border-gray-200",
  amber:
    "text-amber-600 bg-amber-50 data-[hover]:bg-amber-100 border-amber-200",
  red: "text-red-600 bg-red-50 data-[hover]:bg-red-100 border-red-200",
  purple:
    "text-purple-600 bg-purple-50 data-[hover]:bg-purple-100 border-purple-200",
  emerald:
    "text-emerald-600 bg-emerald-50 data-[hover]:bg-emerald-100 border-emerald-200",
};

const Button: FC<IButtonProps> = ({
  children,
  color = "blue",
  className = "",
  ...props
}) => {
  return (
    <HeadlessButton
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border-2 p-2 font-bold shadow-sm transition-all md:p-3 md:px-5 text-sm md:text-base cursor-pointer",
        "data-[active]:scale-95 data-[focus]:outline-none data-[focus]:ring-2 data-[focus]:ring-offset-2",
        colorVariants[color],
        className
      )}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
