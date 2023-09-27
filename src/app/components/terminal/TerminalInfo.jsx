import React, { useState, useEffect } from 'react';

const TerminalInfo = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString()

  const [formattedTime, setFormattedTime] = useState(
    currentDate.toLocaleTimeString()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = new Date();
      const newFormattedTime = newDate.toLocaleTimeString();
      setFormattedTime(newFormattedTime);
    }, 1000)
    return () => clearInterval(intervalId);
  }, []);

  const browserName = navigator.userAgent;
  const osName = navigator.platform;

  const banner = `
   ______ ______   _______  ___     
  |\\   _ \\  _   \\|\\   __  \\|\\  \\    
  \\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\   
   \\ \\  \\\\|__| \\  \\ \\  \\\\\\  \\ \\  \\  
    \\ \\  \\    \\ \\  \\ \\  \\\\\\  \\ \\  \\ 
     \\ \\__\\    \\ \\__\\ \\_______\\ \\__\\
      \\|__|     \\|__|\\|_______|\\|__|
                                    
  `;

  return (
    <div className='terminal__content'>
      <div></div>
      <div>
        <p><span className='terminal__color'>Date:</span> { formattedDate }</p>
        <p><span className='terminal__color'>Hour:</span> { formattedTime }</p>
        <p><span className='terminal__color'>Browser:</span> { browserName }</p>
        <p><span className='terminal__color'>OS:</span> { osName }</p>
        <p><pre className='terminal__color'>{ banner }</pre></p>
      </div>
    </div>
  );
};

export default TerminalInfo;
