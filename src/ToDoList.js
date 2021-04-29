import { useState } from "react";
import TodoShow from "./TodoShow";
import { useEffect } from "react";
import "./ShowForm.css";
import Select from "react-select";
import "./ThemePicker.css";

function ShowForm(props) {
  const options = [
    { value: "All", label: "All" },
    { value: "Important", label: "Important" },
    { value: "NotImportant", label: "Not marked as Important" },
  ];

  const primaryColours = [
    {
      id: "default",
      object: {
        primary25: "darkred",
        primary: "pink",
      },
    },
    {
      id: "gray",
      object: {
        primary25: "dimgray",
        primary: "silver",
      },
    },
    {
      id: "blue",
      object: {
        primary25: "navy",
        primary: "royalblue",
      },
    },
    {
      id: "green",
      object: {
        primary25: "darkgreen",
        primary: "forestgreen",
      },
    },
  ];

  let element = primaryColours.find((o) => o.id === props.theme);

  const theme = (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: element.object.primary25,
      primary: element.object.primary,
    },
  });
  const handleChange = (e) => {
    props.setShow(e.value);
  };

  return (
    <div className="customShowForm react-select-container">
      <label>Show:</label>
      <Select
        onChange={(event) => handleChange(event)}
        key={props.theme}
        options={options}
        theme={theme}
        defaultValue={options[0]}
        classNamePrefix="filter"
        name="show"
        className="selectShow"
      >
        <option value="All">All</option>
        <option value="Important">Important</option>
        <option value="NotImportant">Not marked as important</option>
      </Select>
    </div>
  );
}

function ThemePickerLabel() {
  return (
    <div id="themepickerlabel" className="default">
      Choose your theme
    </div>
  );
}

function ThemePicker(props) {
  const themes = ["default", "gray", "blue", "green"];

  function modifyItems(array) {
    array.forEach(async function (o) {
      await fetch(`http://localhost:3333/to-do/${o.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: o.id,
          name: o.name,
          important: o.important,
          completed: o.completed,
          showCalendar: o.showCalendar,
          reminder: o.reminder,
          theme: o.theme,
        }),
      });
    });
  }

  function setThm(value) {
    let newArr = [];
    props.items.forEach((o) => {
      o.theme = value;
      newArr.push(o);
    });
    props.setItems(newArr);
    console.log(newArr);
    modifyItems(newArr);
  }

  function themeChange(event, value) {
    event.preventDefault();
    props.setTheme(value);
    console.log(value);
    themes.forEach((theme) => {
      if (theme === value) document.body.classList.add(value);
      else document.body.classList.remove(theme);
    });
    let themeLabel = document.getElementById("themepickerlabel");
    themes.forEach((theme) => {
      if (theme === value) themeLabel.classList.add(value);
      else themeLabel.classList.remove(theme);
    });
    let headerButton = document.getElementById("addButton");
    themes.forEach((theme) => {
      if (theme === value) headerButton.classList.add(value);
      else headerButton.classList.remove(theme);
    });
    Array.from(document.getElementsByClassName("importantButton")).forEach(
      function (element, index, array) {
        themes.forEach((theme) => {
          if (theme === value) element.classList.add(value);
          else element.classList.remove(theme);
        });
      }
    );
    Array.from(document.getElementsByClassName("unImportantButton")).forEach(
      function (element, index, array) {
        themes.forEach((theme) => {
          if (theme === value) element.classList.add(value);
          else element.classList.remove(theme);
        });
      }
    );
    Array.from(document.getElementsByClassName("deleteButton")).forEach(
      function (element, index, array) {
        themes.forEach((theme) => {
          if (theme === value) element.classList.add(value);
          else element.classList.remove(theme);
        });
      }
    );
    Array.from(document.getElementsByClassName("completedButton")).forEach(
      function (element, index, array) {
        themes.forEach((theme) => {
          if (theme === value) element.classList.add(value);
          else element.classList.remove(theme);
        });
      }
    );
  }
  return (
    <div className="themePicker">
      <button
        id="default"
        value="default"
        onClick={(event) => {
          themeChange(event, event.target.value);
          setThm(event.target.value);
        }}
      ></button>
      <button
        id="gray"
        value="gray"
        onClick={(event) => {
          themeChange(event, event.target.value);
          setThm(event.target.value);
        }}
      ></button>
      <button
        id="blue"
        value="blue"
        onClick={(event) => {
          themeChange(event, event.target.value);
          setThm(event.target.value);
        }}
      ></button>
      <button
        id="green"
        value="green"
        onClick={(event) => {
          themeChange(event, event.target.value);
          setThm(event.target.value);
        }}
      ></button>
    </div>
  );
}

function ToDoList(props) {
  async function getItems() {
    try {
      let response = await fetch("http://localhost:3333/to-do");
      let data = await response.json();
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  const [items, setItems] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [modif, setModif] = useState(false);

  useEffect(() => {
    getItems().then((result) => setItems(result));
  }, [modif]);

  console.log("ID:", props.id);

  async function addItem(event) {
    try {
      event.preventDefault();

      Array.from(document.querySelectorAll("input")).forEach(
        (input) => (input.value = "")
      );

      setItems([
        ...items,
        {
          id: props.id,
          name: todoTitle,
          important: "no",
          completed: "no",
          showCalendar: "no",
          reminder: "",
          theme: props.theme,
        },
      ]);
      setTodoTitle("");
      await fetch("http://localhost:3333/to-do", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: props.id,
          name: todoTitle,
          important: "no",
          completed: "no",
          showCalendar: "no",
          reminder: "",
          theme: props.theme,
        }),
      });

      props.setId(props.id + 1);
    } catch (e) {
      console.log(e);
    }
  }

  function changeTitle(e) {
    e.preventDefault();
    setTodoTitle(e.target.value);
  }

  return (
    <div className="todoListMain">
      <div className="header">
        <form
          value={todoTitle}
          onSubmit={(event) => {
            event.preventDefault();
            addItem(event);
          }}
        >
          <input
            onChange={(e) => changeTitle(e)}
            placeholder="Enter task"
          ></input>
          <button id="addButton" type="submit" className={props.theme}>
            Add
          </button>
        </form>
      </div>
      <ThemePickerLabel />
      <ThemePicker
        items={items}
        setItems={setItems}
        theme={props.theme}
        setTheme={props.setTheme}
      />
      <ShowForm
        key={props.theme}
        theme={props.theme}
        show={props.show}
        setShow={props.setShow}
      />
      <TodoShow
        modif={modif}
        setModif={setModif}
        setTheme={props.setTheme}
        getItems={getItems}
        items={items}
        setItems={setItems}
        setId={props.setId}
        show={props.show}
      />
    </div>
  );
}

export default ToDoList;
