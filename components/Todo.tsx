import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface TodoProps {
  _id: string;
  title: string;
  inProgress: boolean;
  done: boolean;
}

const Todo = (todo: TodoProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await axios.delete(`${process.env.API_URL}todos/${todo._id}`);
    router.reload();
  };

  const handleDone = async () => {
    await axios.patch(`${process.env.API_URL}todos/${todo._id}`, {
      done: !todo.done,
      inProgress: false,
    });
    router.reload();
  };

  const handleDoing = async () => {
    await axios.patch(`${process.env.API_URL}todos/${todo._id}`, {
      done: false,
      inProgress: !todo.inProgress,
    });
    router.reload();
  };

  const backgroundColor = () => {
    if (todo.done) {
      return "lightGreen";
    } else if (todo.inProgress) {
      return "lightBlue";
    } else {
      return "grey";
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: backgroundColor(),
          paddingLeft: 20,
          borderRadius: 10,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <h4>{todo.title}</h4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "50%",
          }}
        >
          <button
            onClick={() => {
              router.push(`/tarefa/${todo._id}`);
            }}
            style={{ borderRadius: 8, border: "none", padding: 4 }}
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            style={{ borderRadius: 8, border: "none", padding: 4 }}
          >
            Excluir
          </button>
          <button
            onClick={handleDoing}
            style={{ borderRadius: 8, border: "none", padding: 4 }}
          >
            Fazendo
          </button>
          <button
            onClick={handleDone}
            style={{ borderRadius: 8, border: "none", padding: 4 }}
          >
            Concluído
          </button>
        </div>
      </div>
    </>
  );
};

export default Todo;
