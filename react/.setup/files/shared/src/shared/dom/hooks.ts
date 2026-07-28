import { useEffect, useEffectEvent } from 'react';

export function useWindowEvent<Type extends keyof WindowEventMap>(
  type: Type,
  listener: (event: WindowEventMap[Type]) => void,
  options?: boolean | AddEventListenerOptions,
): void {
  const handleEvent = useEffectEvent(listener);

  useEffect(() => {
    window.addEventListener(type, handleEvent, options);

    return () => {
      window.removeEventListener(type, handleEvent, options);
    };
  }, [type, options]);
}
