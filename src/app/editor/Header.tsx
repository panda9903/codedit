import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import RoomId from "./RoomId";
import ClientList from "./ClientList";
import { SelectLanguage } from "./SelectLanguage";
import { LLMButton } from "./LLMButton";
import { SubmitButton } from "./SubmitButton";

interface User {
  username: string;
  socketId: string;
}

const Header = ({
  clients,
  roomId,
  changeLanguage,
}: {
  clients: User[];
  roomId: string | string[];
  changeLanguage: (lang: string) => void;
}) => {
  const { toast } = useToast();

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId as string);
    toast({
      duration: 1000,
      variant: "success",
      description: "Copied to clipboard",
    });
  };

  return (
    <>
      <div className="flex justify-between px-6 py-3 sticky top-0 z-10 bg-gray-100">
        <RoomId roomId={roomId} copyRoomId={copyRoomId} />
        <SelectLanguage changeLanguage={changeLanguage} />
        <LLMButton />
        <SubmitButton />
        <ClientList clients={clients} />
      </div>
    </>
  );
};

export default Header;
