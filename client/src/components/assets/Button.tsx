import "./Button.css";

export function Button({ children, color, ...props }) {
   return (
      <button className={`Button—${color}`} {...props}>{children}</button>
   )
}