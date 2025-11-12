import React from 'react'

interface IButton{
    children: React.ReactNode;
    isFill? : boolean;
    className? : string;
    onClick?:()=> | null
}

const Button:React.FC<IButton> = ({children, isFill, className, onClick}) => {
  return (
    <button onClick={onClick} className={`${isFill && 'bg-blue-500 text-white'} ${className}`}>
        {children}
    </button>
  )
}

export default Button