import FlipMove from "react-flip-move";
import "./TodoList.css";
import DayPicker from "react-daypicker";
import "./Calendar.css";

function Calendar(props) {
  return (
    <div
      className={
        props.showCalendar === "no" ? "dontShowCalendar" : "showCalendar"
      }
    >
      <DayPicker
        onDayClick={(day) => {
          props.toggleShowCalendar(props.name, props.showCalendar);
          props.setReminder(props.name, day + "");
        }}
      ></DayPicker>
    </div>
  );
}

function TodoShow(props) {
  async function deleteTask(id) {
    try {
      await fetch(`http://localhost:3333/to-do/${id}`, { method: "DELETE" });

      let newItems = props.items.filter((o) => o.id !== id);
      let newArr = [];
      newItems.forEach((o) => {
        newArr.push(o);
      });
      props.setItems(newArr);
      props.setModif(!props.modif);
      props.setId(id + 1);

      window.location.reload(false);
    } catch (e) {
      console.log(e);
    }
  }

  console.log("new items:", props.items);

  function toggleImportantButton(important, name) {
    if (important === "no") {
      let newArr = [];
      props.items.forEach((o) => {
        if (o.name === name) o.important = "yes";
        newArr.push(o);
      });
      props.setItems(newArr);
      modifyItems(newArr);
    } else {
      let newArr = [];
      props.items.forEach((o) => {
        if (o.name === name) o.important = "no";
        newArr.push(o);
      });
      props.setItems(newArr);
      modifyItems(newArr);
    }
  }

  function markAsCompleted(name, completed, important) {
    if (completed === "no") {
      let newArr = [];
      props.items.forEach((o) => {
        if (o.name === name) o.completed = "yes";
        newArr.push(o);
      });
      props.setItems(newArr);
      modifyItems(newArr);
      if (important === "yes") {
        let targetButton = document.getElementsByClassName(
          "unImportantButtonyes"
        )[0];
        targetButton.classList.add("unImportantButtonno");
        targetButton.classList.remove("unImportantButtonyes");
      } else {
        let targetButton = document.getElementsByClassName(
          "importantButtonno"
        )[0];
        targetButton.classList.add("importantButtonyes");
        document.body.classList.remove("importantButtonno");
      }
    }
  }

  function toggleShowCalendar(name, showCalendar) {
    if (showCalendar === "no") {
      let newArr = [];
      props.items.forEach((o) => {
        if (o.name === name) o.showCalendar = "yes";
        newArr.push(o);
      });
      props.setItems(newArr);
      modifyItems(newArr);
    } else {
      let newArr = [];
      props.items.forEach((o) => {
        if (o.name === name) o.showCalendar = "no";
        newArr.push(o);
      });
      props.setItems(newArr);
      modifyItems(newArr);
    }
  }

  function setReminder(name, day) {
    let newArr = [];
    props.items.forEach((o) => {
      if (o.name === name) o.reminder = day;
      newArr.push(o);
    });
    props.setItems(newArr);
    modifyItems(newArr);
  }

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

  function createTasks(
    name,
    id,
    important,
    completed,
    showCalendar,
    reminder,
    show
  ) {
    let classNamesReminderSet = `${
      reminder === "" ? "reminderSetYes" : "reminderSetNo"
    } ${completed === "yes" ? "completedTask" : "unCompletedTask"}`;
    let classNamesReminderChange = `${
      reminder === "" ? "reminderChangeNo" : "reminderChangeYes"
    } ${completed === "yes" ? "completedTask" : "unCompletedTask"}`;
    let classes = `${
      important === "yes" ? "importantItem" : "notImportantItem"
    } ${completed === "yes" ? "completedTask" : "notCompletedTask"}`;

    return (
      <li key={id} className={classes}>
        <p className="liText">{name}</p>
        <Calendar
          showCalendar={showCalendar}
          name={name}
          toggleShowCalendar={toggleShowCalendar}
          reminder={reminder}
          setReminder={setReminder}
        ></Calendar>
        <button
          className={classNamesReminderSet}
          onClick={(event) => {
            event.preventDefault();
            toggleShowCalendar(name, showCalendar);
          }}
        >
          Set Reminder
        </button>
        <button
          className={classNamesReminderChange}
          onClick={(event) => {
            event.preventDefault();
            toggleShowCalendar(name, showCalendar);
          }}
        >
          Change Reminder
        </button>
        <button
          className="deleteButton"
          onClick={(event) => {
            event.preventDefault();
            deleteTask(id, name);
          }}
        >
          Delete
        </button>
        <button
          className={
            important === "yes"
              ? "importantButton importantButtonyes"
              : "importantButton importantButtonno"
          }
          onClick={(event) => {
            toggleImportantButton(important, name);
          }}
        >
          Mark as important
        </button>
        <button
          className={
            important === "yes"
              ? "unImportantButton unImportantButtonyes"
              : "unImportantButton unImportantButtonno"
          }
          onClick={(event) => {
            toggleImportantButton(important, name);
          }}
        >
          Unmark as important
        </button>
        <button
          className="completedButton"
          onClick={(event) => {
            markAsCompleted(name, completed, important);
          }}
        >
          {" "}
          Completed!
        </button>
      </li>
    );
  }
  if (props.show === "Important") {
    let filteredArray = props.items.filter((item) => item.important === "yes");
    let itemList = filteredArray.map((item) =>
      createTasks(
        item.name,
        item.id,
        item.important,
        item.completed,
        item.showCalendar,
        item.reminder,
        props.show
      )
    );
    return (
      <ul className="itemList">
        <FlipMove duration={250} easing="ease-out">
          {itemList}
        </FlipMove>
      </ul>
    );
  } else {
    if (props.show === "NotImportant") {
      let filteredArray = props.items.filter((item) => item.important === "no");
      let itemList = filteredArray.map((item) =>
        createTasks(
          item.name,
          item.id,
          item.important,
          item.completed,
          item.showCalendar,
          item.reminder,
          props.show
        )
      );
      return (
        <ul className="itemList">
          <FlipMove duration={250} easing="ease-out">
            {itemList}
          </FlipMove>
        </ul>
      );
    } else {
      let filteredArray = props.items;
      let itemList = filteredArray.map((item) =>
        createTasks(
          item.name,
          item.id,
          item.important,
          item.completed,
          item.showCalendar,
          item.reminder,
          props.show
        )
      );
      return (
        <ul className="itemList">
          <FlipMove duration={250} easing="ease-out">
            {itemList}
          </FlipMove>
        </ul>
      );
    }
  }
}

export default TodoShow;
