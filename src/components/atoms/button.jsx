import React from 'react'

const button = ({text,styles,onClick}) => {
  return (
        <>
        <button onClick={onClick} className={styles}>{text}</button>
        </> 
 )
}

export default button