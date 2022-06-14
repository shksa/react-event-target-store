import { useEffect, useReducer } from "react";
import isSameShallowly from "./shallow";
import { useEvent } from "./useEvent";

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

  const reducerForSelector = (oldSelection, newSelection) => {
    return isSameShallowly(oldSelection, newSelection) ? oldSelection : newSelection
  }

  const useStore = (selector) => {
    const [selectedState, dispatch] = useReducer(
      selector ? reducerForSelector : (n => n + 1),
      selector ? store.getState() : 0,
      selector
    );

    const onStateUpdate = useEvent(() => {
      dispatch(selector?.(store.getState()))
    })

    useEffect(() => {
      store.addEventListener(Store.stateUpdateEvent.type, onStateUpdate);
      return () =>
        store.removeEventListener(Store.stateUpdateEvent.type, onStateUpdate);
    }, []);

    return selector ? selectedState : store.getState();
  };

  return useStore;
};
