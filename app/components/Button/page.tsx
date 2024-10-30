import { ThemeContext } from "@/app/context/ThemeContext";
import { useContext } from "react";

export interface IButton {
    childern: JSX.Element;
    click: () => void;
}


export const Button = ({ childern, click}: IButton) => {
    const theme = useContext(ThemeContext);

  return (
    <div>
      <button
        style={{
            backgroundColor: theme.backgroundColor,
            color: theme.foregroundColor
        }}
        onClick={click}
      >
        {childern}
      </button>
    </div>
  )
}

export default Button
