"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import ControlledEditor from "@monaco-editor/react";
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
  const [code, setCode] = useState<string>("");
  const [timeOut, setTimeOut] = useState<any>(setTimeout(() => {}, 0));
  const [cursor, setCursor] = useState<any>({ line: 0, column: 0 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const { roomId } = useParams();

  roomIdRef.current = roomId;
  usernameRef.current = username;
  //console.log(roomId, username);

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
          //console.log(username, usernameRef.current);
          if (username !== usernameRef.current) {
            // show toast - user joined
            //console.log("User joined", username);
          }
          setUsers(clientsList);

          /* socketRef.current.emit("sync-code", {
            socketId,
            code,
          }); */
        }
      );

      socketRef.current.on(
        "disconnected",
        ({ socketId, username }: { socketId: string; username: string }) => {
          //show toast user left room
          // console.log("Disconnecting", username);
          setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
          //console.log("User left", username);
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

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("code-change", (code: string, setValue: string) => {
      if (setValue) {
        //console.log(code);
        // set code
        /* console.log(editorRef.current);
          (editorRef.current as any).getModel().setValue(code);
          console.log(editorRef.current.getValue()); */

        if (code === editorRef.current.getValue()) return;

        setCode(code);
        console.log("Current cursor", cursor);
        setCursor({ line: cursor.line, column: cursor.column });
        console.log(cursor);
        editorRef.current.setValue(code);
      }
    });

    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const codeChange = (value: string | undefined, event: any) => {
    //console.log(value);
    //console.log(event);
    const position = editorRef.current.getPosition();
    console.log("Cursor after change", position);
    setCursor({ line: position.line, column: position.column });

    clearTimeout(timeOut);
    const newTimeOut = setTimeout(() => {
      socketRef.current.emit("code-change", {
        roomId,
        code: value,
      });
    }, 100);

    setTimeOut(newTimeOut);

    /*  socketRef.current.emit("code-change", {
      roomId,
      code: value,
    }); */
  };

  return (
    <ControlledEditor
      value={code}
      height="100vh"
      width="100vw"
      theme="vs-dark"
      language="javascript"
      onChange={codeChange}
      onMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
