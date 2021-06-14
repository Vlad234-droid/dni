import { useEffect } from 'react';
import { Registrable } from 'features/Common/components/FieldWrapper';

const useRegistrationField = (methods: Partial<Registrable>, name: string) => {
  const { register, unregister, setValue } = methods;
  useEffect(() => {
    if (typeof register === 'undefined' || typeof unregister === 'undefined')
      return;
    register(name);
    return () => unregister(name);
  }, [register, unregister, name]);

  return setValue;
};

export default useRegistrationField;
