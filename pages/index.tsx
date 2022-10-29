import styles from "../styles/Home.module.css";
import axios from "axios";
import Todo from "../components/Todo";
import Head from "next/head";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const Home = (todos: any) => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState(todos.todos);

  const handleSubmit = async () => {
    if (title == "") {
      alert("Preencha o campo!");
    } else {
      const todo = {
        title,
      };
      await axios.post(`${process.env.API_URL}todos`, todo);
    }
  };

  const handleSelect = async (e: any) => {
    const selected = e.target.value;
    if (selected == "done") {
      const done = todos.todos.filter((todo: any) => todo.done == true);
      setList(done);
    } else if (selected == "doing") {
      const inProgress = todos.todos.filter(
        (todo: any) => todo.inProgress == true
      );
      setList(inProgress);
    } else if (selected == "mustDo") {
      const notStarted = todos.todos.filter(
        (todo: any) => todo.inProgress == false && todo.done == false
      );
      setList(notStarted);
    } else {
      setList(todos.todos);
    }
  };

  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <div className={styles.todoContainer}>
        <header className={styles.header}>
          <h1>TO-DO List</h1>
        </header>

        <div className={styles.formHeaderSection}>
          <form
            onSubmit={handleSubmit}
            className={`${styles.todoForm} ${styles.form}`}
          >
            <p className={styles.p}>Adicione sua tarefa</p>
            <div className={styles.formControl}>
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                type="text"
                className={`${styles.todoInput} ${styles.input}`}
                placeholder="Do que você quer lembrar?"
              />
              <button className={styles.button} type="submit">
                <AiOutlinePlus />
              </button>
            </div>
          </form>
          <div className={styles.toolbar}>
            <div className={styles.filter}>
              <h4 className={styles.h4}>Filtrar:</h4>
              <select
                onChange={(event) => {
                  handleSelect(event);
                }}
                className={`${styles.select} ${styles.filterSelect}`}
                id="filter-select"
              >
                <option className={styles.option} value="all">
                  Todos
                </option>
                <option className={styles.option} value="done">
                  Concluídos
                </option>
                <option className={styles.option} value="doing">
                  Fazendo
                </option>
                <option className={styles.option} value="mustDo">
                  A fazer
                </option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10 }} id="todo-list">
          {list.map((todo: any) => {
            return (
              <Todo
                key={todo._id}
                _id={todo._id}
                title={todo.title}
                inProgress={todo.inProgress}
                done={todo.done}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const res = await axios.get(`${process.env.API_URL}todos`);
  const todos: [] = res.data;
  return {
    props: {
      todos,
    },
  };
}

export default Home;
