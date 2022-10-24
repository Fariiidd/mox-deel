import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Socket } from "socket.io-client";
import OTPModal from "./OTPModal";

interface IProps {
  socket: Socket;
}

const Form: React.FC<IProps> = ({ socket }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { target }: { target: any } = event;
    const email = target[0].value;
    const pass = target[1].value;

    socket.emit("login", { email, pass });
  };

  useEffect(() => {
    socket.on("otpPrompt", () => {
      setOtp(true);
    });

    return () => {
      socket.off("otpPrompt");
    };
  }, []);

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar con Deel</button>
      </form>
      {otp && <OTPModal socket={socket} />}
    </>
  );
};

export default Form;
