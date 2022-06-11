import "./Button.css";

function Button({ children, color, ...props }) {
   return (
      <button className={`Button—${color}`} {...props}>
         {children}
      </button>
   )
}

export default Button