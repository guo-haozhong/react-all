import { useState, useEffect } from 'react';
import { subScribe, unSubScribe } from './public';

export default name => {
  const [, setState] = useState();
  useEffect(() => {
    subScribe(name, setState);
    return () => unSubScribe(name, setState);
  }, []);
};
