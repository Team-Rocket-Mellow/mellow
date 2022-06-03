function Icon({ className, children, ...props }: { children: React.ReactNode; className?:string }) {
  return (
    <i className={`material-symbols-rounded ${className}`} {...props}>
      {children}
    </i>
  )
}

export default Icon