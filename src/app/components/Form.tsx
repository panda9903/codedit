"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { generate, count } from "random-words";
import { stat } from "fs";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  roomid: z.string().min(2, {
    message: "Room ID must be at least 10 characters.",
  }),
});

export function RoomForm() {
  const [clicks, setClicks] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [roomid, setRoomid] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      roomid: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = form.getValues();

    setUsername(res.username);
    setRoomid(res.roomid);

    router.push(`/editor/${res.roomid}?username=${res.username}`);
  }

  function generateRoom() {
    setClicks((prev) => prev + 1);

    let roomId = "";

    if (clicks !== 34) {
      roomId = generate({ exactly: 4, maxLength: 8, join: "-" });
    } else {
      roomId = "hi-i-am-satwik";
    }

    form.setValue("roomid", roomId);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your username" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roomid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Room ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={cn(loading == false ? " opacity-100" : "opacity-80")}
          >
            Join
          </Button>
        </form>
      </Form>
      <Button onClick={() => generateRoom()}>Generate Room ID</Button>
    </>
  );
}
