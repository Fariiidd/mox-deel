import React, { useState } from "react";
import { Socket } from "socket.io-client";

interface IProps {
  socket: Socket;
}

const OTPModal: React.FC<IProps> = ({ socket }) => {
  const [otp, setOTP] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setOTP(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { target }: { target: any } = event;
    const token = target[0].value;

    socket.emit("otp", { otp: token });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="otp" value={otp} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default OTPModal;
