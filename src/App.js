//import logo from './logo.svg';
import "./App.css";
import "./TodoList.css";
import ToDoList from "./ToDoList";
import Header from "./Header";
import { useState } from "react";

function App() {
  let quotes = [
    ' "The secret of getting ahead is getting started" ',
    ' "Nothing is so fatiguing as the eternal hanging on of an uncompleted task" ',
    ' "Nothing is particularly hard if you divide it into small jobs"',
    ' "A worker without genius is better than a genius who won`t work" ',
    ' "Approach each task in your life, no matter how simple or complex, with power" ',
  ];
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const [show, setShow] = useState("All");
  const [theme, setTheme] = useState("default");
  const [id, setId] = useState(1);

  async function getElem() {
    let response = await fetch("http://localhost:3333/to-do");
    let data = await response.json();
    if (data.length > 0) {
      setTheme(data[0].theme);
      setId(data[data.length - 1].id + 1);
    }
  }
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    getElem();
  }

  document.body.classList.add(theme);

  return (
    <div className="App">
      <Header quote={randomQuote} />
      <ToDoList
        setId={setId}
        id={id}
        theme={theme}
        setTheme={setTheme}
        show={show}
        setShow={setShow}
      />
    </div>
  );
}

export default App;
