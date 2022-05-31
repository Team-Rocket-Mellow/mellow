import "./Button.css";

export function Button({ children, ...props }) {
   return (
      <button className="Button—gray" {...props}>{children}</button>
   )
}