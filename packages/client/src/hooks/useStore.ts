import { RootState } from 'store/rootReducer';
import { useSelector } from 'react-redux';
import get from 'lodash.get';

function useStore<T>(path: (state: RootState) => T): T;
function useStore<T>(path: string): T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useStore<T>(path: any): T {
  return useSelector<RootState, T>((state: RootState) =>
    typeof path === 'string' ? get(state, path) : path(state),
  );
}

export default useStore;
