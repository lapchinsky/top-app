import {createContext, PropsWithChildren, ReactNode, useState} from "react";
import {MenuItem} from "../interfaces/menu.interface";
import {TopLevelCategory} from "../interfaces/page.interface";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {AppContext} from "next/app";

export interface IAppContext {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const AppContext = createContext<IAppContext>({menu: [], firstCategory: TopLevelCategory.Courses});

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext> ): JSX.Element => {
    const [menuState, setMenuState] = useState<MenuItem[]>(menu);
    const setMenu = (newMenu: MenuItem[]) => {
        setMenuState(newMenu);
    };

    return <AppContext.Provider value={{menu: menuState, firstCategory, setMenu }}>
        {children}
    </AppContext.Provider>;
};