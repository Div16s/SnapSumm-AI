
const BgGradient = ({children,className}:{children?: React.ReactNode; className?: string}) => {
  return (
    <div className={`relative isolate ${className}`}>
        <div aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 -top-40
        -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
        >
            <div 
              style={{
                clipPath: 'polygon(74.2% 44.3%, 100% 50.5%, 100% 100%, 0% 100%, 0% 0%, 25.8% 0%)',
              }}
              className="absolute inset-0 -z-10 transform-gpu overflow-hidden bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 opacity-30 blur-3xl"
            />
        </div>
        {children}
    </div>
  )
}

export default BgGradient