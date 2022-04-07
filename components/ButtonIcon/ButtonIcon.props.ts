import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import {menu, up, close} from "./icons";

export const icons = {
    up,
    close,
    menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon: IconName;
    appearance: 'primary' | 'white';
}