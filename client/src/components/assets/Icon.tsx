function Icon({ className, children, ...props }: 
  { className?:string, children: React.ReactNode, [key:string]:any }
) {
  return (
    <i className={`material-symbols-rounded ${className}`} {...props}>
      {children}
    </i>
  )
}

export default Icon