import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface AdvantageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: string
    children: ReactNode;
}