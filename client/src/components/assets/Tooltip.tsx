import "./Tooltip.css"

function Tooltip({ children, content, ...props }) {
   return (
      <div id="Tooltip" {...props}>
         {children}
         <div className="bottom">{content}</div>
      </div>
   )
}

export default Tooltip