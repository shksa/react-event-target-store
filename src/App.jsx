import { create } from "./store";
import "./App.css";
import { movies } from "./data";
import { useEffect, useRef, useState } from "react";

const useStore = create((set, get) => ({
  listA: movies,
  listB: [],
  listC: [],
  move: ({ itemId, from, to }) => {
    const fromList = get()[from]
    const toList = get()[to]
    const itemIndex = fromList.findIndex((item) => item.id === itemId);
    const newFromList = fromList.filter(({ id }) => id !== itemId);
    const newToList = toList.concat(fromList[itemIndex])
    set({
      [from]: newFromList,
      [to]: newToList
    });
  }
}));

function ListA() {
  const { listA, move } = useStore(({ listA, move }) => ({ listA, move }));
  const onClick = (itemId) => {
    move({ itemId, from: 'listA', to: 'listB' })
  };
  return (
    <section>
      <h2>List A</h2>
      <ul>
        {listA.map(({ id, title }) => (
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
  const { listB, move } = useStore(({ listB, move }) => ({ listB, move }));
  const onClick = (itemId) => {
    move({ itemId, from: 'listB', to: 'listA' })
  };
  return (
    <section>
      <h2>List B</h2>
      <ul>
        {listB.map(({ id, title }) => (
          <li key={id}>
            <span>{title}</span>
            <button onClick={() => onClick(id)}>Move to List A</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ListC() {
  const { listC, move } = useStore(({ listC, move }) => ({ listC, move }));
  const onClick = (itemId) => {
    move({ itemId, from: 'listC', to: 'listA' })
  };
  const renderedCountRef = useRef(1)
  useEffect(() => {
    renderedCountRef.current += 1
  })
  return (
    <section>
      <h2>List C</h2>
      <ul>
        {listC.map(({ id, title }) => (
          <li key={id}>
            <span>{title}</span>
            <button onClick={() => onClick(id)}>Move to List A</button>
          </li>
        ))}
      </ul>
      <div>rendered {renderedCountRef.current} times</div>
    </section>
  );
}

function ListACounter() {
  const listAlength = useStore(({listA}) => listA.length);
  const renderedCountRef = useRef(1)
  useEffect(() => {
    renderedCountRef.current += 1
  })
  return (
    <div>
      List A length: {listAlength}
      <div>rendered {renderedCountRef.current} times</div>
    </div>
  )
}

function ListBCounter() {
  const listBlength = useStore(({listB}) => listB.length);
  const renderedCountRef = useRef(1)
  useEffect(() => {
    renderedCountRef.current += 1
  })
  return (
    <div>
      List B length: {listBlength}
      <div>rendered {renderedCountRef.current} times</div>
    </div>
  )
}

function ListCCounter() {
  const listCLength = useStore(({listC}) => listC.length);
  const renderedCountRef = useRef(1)
  useEffect(() => {
    renderedCountRef.current += 1
  })
  return (
    <div>
      List C length: {listCLength}
      <div>rendered {renderedCountRef.current} times</div>
    </div>
  )
}

export default function App() {
  return (
    <>
      <div className="grid">
        <ListACounter />
        <ListBCounter />
        <ListCCounter />
      </div>
      <div className="grid">
        <ListA />
        <ListB />
        <ListC />
      </div>
    </>
  );
}
