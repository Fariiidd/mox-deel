import type { NextPage } from "next";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Form socket={socket} />
    </div>
  );
};

export default Home;
