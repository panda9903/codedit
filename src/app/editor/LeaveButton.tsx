"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const LeaveButton = () => {
  const router = useRouter();

  const leaveRoom = () => {
    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={leaveRoom}>
      Leave Room
    </Button>
  );
};

export default LeaveButton;
