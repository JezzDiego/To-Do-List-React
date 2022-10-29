import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/Home.module.css";
import { MdOutlineDone } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";

const Index = (props: any) => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any, id: string) => {
    e.preventDefault();
    if (title == "") {
      alert("Preencha o campo!");
    } else {
      await axios.patch(`${process.env.API_URL}todos/${id}`, {
        title: title,
      });
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>{props.todo.title}</title>
      </Head>
      <div className={styles.todoContainer}>
        <header className={styles.header}>
          <h1>TO-DO List</h1>
        </header>
        <div
          style={{
            paddingLeft: 50,
            marginBottom: 10,
            borderTop: "1px solid #ccc",
            borderBottom: "1px solid #ccc",
            paddingBottom: 30,
            paddingTop: 20,
          }}
        >
          <form
            onSubmit={async (e) => {
              await handleSubmit(e, props.todo._id);
            }}
          >
            <h3>Edite sua tarefa</h3>
            <div style={{ display: "flex", marginBottom: 15 }}>
              <input
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                type="text"
                placeholder={props.todo.title}
                style={{
                  fontSize: 18,
                  borderRadius: 7,
                  border: "1px solid #102f5e",
                  paddingLeft: 10,
                }}
              />

              <button
                style={{
                  marginLeft: 10,
                  border: "1px solid #102f5e",
                  borderRadius: 7,
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 0,
                }}
              >
                <MdOutlineDone size={30} />
              </button>
            </div>

            <Link
              style={{
                borderRadius: 7,
                padding: 5,
                border: "1px solid #102f5e",
              }}
              href="/"
            >
              {" "}
              Voltar{" "}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await axios.get(`${process.env.API_URL}todos/${id}`);
  const todo = res.data;
  return {
    props: {
      todo,
    },
  };
}

export default Index;
