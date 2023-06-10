import { useEffect, useState } from "react";

const useCountdown = (countdownTarget) => {     //Target time in the form of date and time
  const countdownTime = new Date(countdownTarget).getTime();      //Target time only
  const [countDown, setCountDown] = useState(
    countdownTime - new Date().getTime()    //Time left from target and now
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(prev => prev-1000);      //updating timer by decreasing 1000 as previously time was in MS
    }, 1000);
    console.log(countDown);
    return () => clearInterval(interval);
  }, [countdownTime]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  if(minutes>=0 && seconds>=0){
    return [minutes, seconds,false]
   } 
  else {
    return [0,0,true];
  };
};

export { useCountdown };