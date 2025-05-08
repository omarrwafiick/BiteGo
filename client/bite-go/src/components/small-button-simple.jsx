import React from 'react' 

export default function SmallButtonSimple({name, style, onClick}) {  
  return (
    <a onClick={onClick} type="button" className={`hover:bg-gradient-to-br cursor-pointer font-medium rounded-full text-md px-5 py-2 text-center shadow-lg hover:shadow-xl ${style}`}>{name}</a>
  )
}
 