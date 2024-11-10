import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useGetFromStore(store: any, callback: any) {
    const result = store(callback);
    const [state, setState] = useState();

    useEffect(() => {
        setState(result);
    }, [result]);

    return state;
}