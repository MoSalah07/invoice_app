import { useState, useEffect } from 'react';

function getWindowDeimensions () {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

function useWindowDeimensions() {
  const [windowDimensions, setWindowDimensions] = useState( getWindowDeimensions() );

  useEffect(() => {
    const handelResize = () => {
      setWindowDimensions( getWindowDeimensions );
    }
    window.addEventListener( 'resize', handelResize );
    return () => window.removeEventListener( 'resize', handelResize );
  }, []);

  return windowDimensions;
}

export default useWindowDeimensions;