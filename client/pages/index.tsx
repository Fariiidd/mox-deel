import type { GetServerSideProps, NextPage } from "next";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";
import io, { Socket } from "socket.io-client";

const socket = io("http://localhost:4000");
console.log("socket connected");

/* type props = {
  socket: Socket
}

interface Iprops {
  props: props
} */

const Home: NextPage = (/* { socket } */) => {
  return (
    <div className={styles.container}>
      <Form socket={socket} />
    </div>
  );
};

/* export const getServerSideProps: GetServerSideProps<Iprops> = async (context) => {
  const socket = io("http://localhost:4000");

  return {
    props: { socket }, // will be passed to the page component as props
  };
}; */

export default Home;
