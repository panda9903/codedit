"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { initSocket } from "../../socket";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  socketId: string;
}

const CodeEditor = () => {
  const editorRef = useRef(null);
  const socketRef = useRef<any>(null);
  const roomIdRef = useRef<string[] | string | null>(null);
  const usernameRef = useRef<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const { roomId } = useParams();

  roomIdRef.current = roomId;
  usernameRef.current = username;
  console.log(roomId, username);

  const handleError = (err: any) => {
    console.error(err);
  };

  useEffect(() => {
    const init = async () => {
      if (!roomId || !username) {
        router.push("/");
        return;
      }

      socketRef.current = initSocket();

      socketRef.current.on("connect_error", (err: Error) => {
        handleError(err);
      });
      socketRef.current.on("connect_failed", (err: Error) => {
        handleError(err);
      });

      function handleError(err: Error) {
        // show toast
        router.push("/");
      }

      socketRef.current.emit("join", {
        roomId,
        username,
      });

      socketRef.current.on(
        "joined",
        ({
          clientsList,
          username,
          socketId,
        }: {
          clientsList: User[];
          username: string;
          socketId: string;
        }) => {
          console.log(username, usernameRef.current);
          if (username !== usernameRef.current) {
            // show toast - user joined
            console.log("User joined", username);
          }
          setUsers(clientsList);
        }
      );

      socketRef.current.on(
        "disconnected",
        ({ socketId, username }: { socketId: string; username: string }) => {
          //show toast user left room
          console.log("Disconnecting", username);
          setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
          console.log("User left", username);
        }
      );
    };

    init();

    return () => {
      socketRef.current.off("disconnected");
      socketRef.current.off("joined");
      socketRef.current.disconnect();
    };
  }, []);

  function handleEditorDidMount(editor: any, monaco: any) {}

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      language="javascript"
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
