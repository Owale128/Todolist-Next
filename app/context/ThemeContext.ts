'use client'
import { createContext } from "react";


export interface ITheme {
    name: string;
    backgroundColor: string;
    foregroundColor: string;
    borderColor: string;
}

export interface IThemes {
    dark: ITheme;
    light: ITheme;
}

export const themes: IThemes =  {
    dark: {
        name: 'Night',
        backgroundColor: 'black',
        foregroundColor: 'white',
        borderColor: 'white'
    }, 
    light: {
        name: 'Day',
        backgroundColor: 'white',
        foregroundColor: 'black',
         borderColor: 'black'
    }
}

    export const ThemeContext = createContext<ITheme>(themes.dark) 