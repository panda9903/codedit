"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { initSocket } from "../../socket";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

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
  const cursorRef = useRef<{ line: 0; ch: 0 }>({ line: 0, ch: 0 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const { roomId } = useParams();

  roomIdRef.current = roomId;
  usernameRef.current = username;

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
          if (username !== usernameRef.current) {
            // show toast - user joined
          }
          setUsers(clientsList);

          socketRef.current.emit("sync-code", {
            socketId,
            code,
          });
        }
      );

      socketRef.current.on(
        "disconnected",
        ({ socketId, username }: { socketId: string; username: string }) => {
          //show toast user left room
          setUsers((prev) => prev.filter((user) => user.socketId !== socketId));
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
      console.log("Code change from server", code);
      if (setValue) {
        setCode(code);
      }
    });

    socketRef.current.on("sync-code", (code: string) => {
      setCode(code);
    });

    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const codeChange = (editor: any, data: any, value: string) => {
    const val = data.transactions[0].annotations[0].value;
    const isUserEvent = data.transactions[0].isUserEvent(val);
    console.log(data.transactions[0].isUserEvent(val));

    clearTimeout(timeOut);
    //console.log(data.state.selection);
    //console.log(data.getCursor());
    //console.log(data.state.selection.main.head);
    if (!isUserEvent) return;
    const newTimeOut = setTimeout(() => {
      socketRef.current.emit("code-change", {
        roomId,
        code: editor,
      });
    }, 250);

    setTimeOut(newTimeOut);
  };

  return (
    <CodeMirror
      value={code}
      height="100vh"
      width="100vw"
      onChange={codeChange}
      extensions={[javascript({ jsx: true })]}
    />
  );
};

export default CodeEditor;
