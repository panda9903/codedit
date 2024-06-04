import React from "react";
import { Avatar } from "react-profile-avatar";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LeaveButton from "./LeaveButton";
interface User {
  username: string;
  socketId: string;
}

const ClientList = ({ clients }: { clients: User[] }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Participants</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pariticipants in the call</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col">
            <div className="flex flex-col gap-y-4 mt-6">
              {clients.map((client) => (
                <div className="flex gap-x-6" key={client.socketId}>
                  {
                    <Avatar
                      key={client.socketId}
                      name={client.username}
                      className="p-1 border border-black rounded-full"
                    />
                  }
                  <span className="mt-1">{client.username}</span>
                </div>
              ))}
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <LeaveButton />
              </SheetClose>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ClientList;
