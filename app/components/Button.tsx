import { ThemeContext } from "@/app/context/ThemeContext";
import { useContext } from "react";

export interface IButton {
    children: JSX.Element;
    click?: () => void;
    className?: string;
}

export const Button = ({ children, click, className}: IButton) => {
    const theme = useContext(ThemeContext);

  return (
    <div>
      <button
        style={{
            backgroundColor: theme.backgroundColor,
            color: theme.foregroundColor,
            borderColor: theme.borderColor, 
        }}
        className={className}
        onClick={click}>

        {children}
        
      </button>
    </div>
  )
}

export default Button
