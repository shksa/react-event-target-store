import { create } from "./store";
import "./App.css";
import { movies } from "./data";

const useStore = create((set, get) => ({
  listA: movies,
  listB: [],
  move: ({itemId, from, to}) => {
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
  const store = useStore();
  const onClick = (itemId) => {
    store.move({itemId, from: 'listA', to: 'listB'})
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
  const onClick = (itemId) => {
    store.move({itemId, from: 'listB', to: 'listA'})
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
