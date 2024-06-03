import React from "react";

const RoomId = ({
  roomId,
  copyRoomId,
}: {
  roomId: string | string[];
  copyRoomId: () => void;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <p>
        Room ID: <span className="font-bold">{roomId}</span>
      </p>
      <img
        src="/copy.svg"
        height={20}
        width={20}
        onClick={() => {
          copyRoomId();
        }}
        className="-mt-2 cursor-pointer"
      />
    </div>
  );
};

export default RoomId;
