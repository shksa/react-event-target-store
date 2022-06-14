import { useEffect, useReducer } from "react";

class Store extends EventTarget {
  constructor(stateCreator) {
    super();
    this.state = stateCreator(this.setState, this.getState);
  }
  static stateUpdateEvent = new Event("update");
  setState = (newState) => {
    Object.assign(this.state, newState);
    this.dispatchEvent(Store.stateUpdateEvent);
  };
  getState = () => {
    return this.state;
  };
}

export const create = (stateCreator) => {
  const store = new Store(stateCreator);

  const useStore = () => {
    const [, rerender] = useReducer((n) => n + 1, 0);

    useEffect(() => {
      store.addEventListener(Store.stateUpdateEvent.type, rerender);
      return () =>
        store.removeEventListener(Store.stateUpdateEvent.type, rerender);
    }, []);

    return store.state;
  };

  return useStore;
};
