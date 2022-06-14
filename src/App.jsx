import { useEffect, useReducer } from "react";
import { create } from "./store";
import "./App.css";

const movies = [
  {
    id: 1,
    title: "Navigator, The"
  },
  {
    id: 2,
    title: "Jim Jefferies: Alcoholocaust"
  },
  {
    id: 3,
    title: "Puzzlehead"
  },
  {
    id: 4,
    title: "The Big Cube"
  },
  {
    id: 5,
    title: "Journey to the Center of the Earth"
  },
  {
    id: 6,
    title: "Asphalt Jungle, The"
  },
  {
    id: 7,
    title: "Day of the Animals"
  },
  {
    id: 8,
    title: "Sterile Cuckoo, The"
  },
  {
    id: 9,
    title: "American Ninja 2: The Confrontation"
  },
  {
    id: 10,
    title: "The Testimony"
  }
];

const useStore = create((set, get) => ({
  listA: movies,
  listB: [],
  moveFromListAToListB: (itemId) => {
    const { listA, listB } = get();
    const itemIndex = listA.findIndex((item) => item.id === itemId);
    const newListA = listA.filter(({ id }) => id !== itemId);
    set({
      listB: [...listB, listA[itemIndex]],
      listA: newListA
    });
  },
  moveFromListBToListA: (itemId) => {
    const { listA, listB } = get();
    const itemIndex = listB.findIndex((item) => item.id === itemId);
    const newListB = listB.filter(({ id }) => id !== itemId);
    set({
      listA: [...listA, listB[itemIndex]],
      listB: newListB
    });
  }
}));

function ListA() {
  const store = useStore();
  const onClick = (id) => {
    store.moveFromListAToListB(id);
  };
  return (
    <section>
      <h2>List A</h2>
      <ul>
        {store.listA.map(({ id, title }) => (
          <li key={id}>
            <span>{title}</span>
            <button onClick={() => onClick(id)}>Move to List B</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ListB() {
  const store = useStore();
  const onClick = (id) => {
    store.moveFromListBToListA(id);
  };
  return (
    <section>
      <h2>List B</h2>
      <ul>
        {store.listB.map(({ id, title }) => (
          <li key={id}>
            <span>{title}</span>
            <button onClick={() => onClick(id)}>Move to List A</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function App() {
  return (
    <div className="app">
      <ListA />
      <ListB />
    </div>
  );
}
