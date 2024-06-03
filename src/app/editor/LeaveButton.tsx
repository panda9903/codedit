"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LeaveButton = () => {
  const router = useRouter();

  const leaveRoom = () => {
    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={leaveRoom} className="mt-4">
      Leave Room
    </Button>
  );
};

export default LeaveButton;
