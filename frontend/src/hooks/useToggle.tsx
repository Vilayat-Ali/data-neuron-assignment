import {useState, useCallback} from 'react';

const useToggle = (defaultState: boolean = false) => {
  const [state, setState] = useState<boolean>(defaultState);
  const Toggle = useCallback(() => setState(!state), [state]);
  return [state, Toggle, setState] as const;
}

export default useToggle