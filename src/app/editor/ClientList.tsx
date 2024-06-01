import React from "react";
import Avatar from "react-avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import { redirect } from "next/navigation";
import LeaveButton from "./LeaveButton";
interface User {
  username: string;
  socketId: string;
}

const ClientList = ({ clients }: { clients: User[] }) => {
  return (
    <div>
      {/*       {clients.map((client) => (
        <Avatar
          key={client.socketId}
          name={client.username}
          size="30"
          round="14px"
        />
      ))} */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Participants</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Pariticipants in the call</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="flex flex-col">
            <div className="flex flex-col gap-y-4 mt-6">
              {clients.map((client) => (
                <div className="flex gap-x-6">
                  <Avatar
                    key={client.socketId}
                    name={client.username}
                    size="30"
                    round="14px"
                  />
                  <span>{client.username}</span>
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
