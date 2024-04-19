"use client";

import React, { ReactElement, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { initSocket } from "../../socket";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CodeEditor = () => {
  const editorRef = useRef(null);
  const socketRef = useRef<any>(null);
  const roomIdRef = useRef<string[] | string | null>(null);
  const usernameRef = useRef<string | null>(null);

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
    };

    init();
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
