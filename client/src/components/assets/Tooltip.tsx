function Tooltip({ children, ...props }) {
   return (
      <abbr {...props}>
         {children}
      </abbr>
   )
}

export default Tooltip;