import { useEffect, useReducer } from "react";
import isSameShallowly from "./shallow";
import { useEvent } from "./useEvent";

class Store extends EventTarget {
  constructor(stateCreator) {
    super();
    this.state = stateCreator(this.setState, this.getState);
  }

  static stateUpdateEvent = new Event("update");

  subscribe = (listener) => {
    this.addEventListener(Store.stateUpdateEvent.type, listener)
    return () => this.removeEventListener(Store.stateUpdateEvent.type, listener)
  }

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

  const defaultSelector = (state) => ({...state})

  const useStore = (selector = defaultSelector) => {
    const [selectedState, dispatch] = useReducer(
      (old, newd) => {
        if (isSameShallowly(old, newd) && selector !== defaultSelector) {
          return old
        }
        return newd
      },
      store.getState(),
      selector
    );

    const onStateUpdate = useEvent(() => {
      dispatch(selector(store.getState()))
    })

    useEffect(() => store.subscribe(onStateUpdate), []);

    return selectedState;
  };

  return useStore;
};
