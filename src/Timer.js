import React from 'react'

const Timer = ({value,type,isDanger}) => {
  // console.log(value+" "+type);
  return (
    <>
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
            <p className="timer-text text-white text-center m-0">{value}</p>
            <p>{type}</p>
        </div>
    </>
  )
}

export default Timer