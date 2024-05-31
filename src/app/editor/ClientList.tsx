import React from "react";
import Avatar from "react-avatar";

interface User {
  username: string;
  socketId: string;
}

const ClientList = ({ clients }: { clients: User[] }) => {
  return (
    <div>
      {clients.map((client) => (
        <Avatar
          key={client.socketId}
          name={client.username}
          size="30"
          round="14px"
        />
      ))}
    </div>
  );
};

export default ClientList;
