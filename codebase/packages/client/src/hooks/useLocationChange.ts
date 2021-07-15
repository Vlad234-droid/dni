import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default (action: () => void) => {
  const location = useLocation();

  useEffect(() => {
    action && action();
  }, [location]);
};
