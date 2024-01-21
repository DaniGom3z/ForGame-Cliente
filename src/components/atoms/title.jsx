import React from 'react'

const title = ({text, styles}) => {
  return (
   <>
   <h2 className={styles}>{text}</h2>
   </>
  )
}

export default title