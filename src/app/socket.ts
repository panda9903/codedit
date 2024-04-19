import { io } from "socket.io-client";

export const initSocket = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: 100000,
    timeout: 10000,
    transports: ["websocket"],
  };

  const socket = io("http://localhost:5000", options);
  return socket;
};
