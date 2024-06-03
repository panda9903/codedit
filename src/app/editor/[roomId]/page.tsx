"use client";

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { initSocket } from "../../socket";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { useToast } from "@/components/ui/use-toast";
import { codeStore } from "@/store/codeStore";
import Header from "../Header";

interface User {
  username: string;
  socketId: string;
}

const CodeEditor = () => {
  const setCodeInStore = codeStore((state) => state.setCode);
  const socketRef = useRef<any>(null);
  const roomIdRef = useRef<string[] | string | null>(null);
  const usernameRef = useRef<string | null>(null);
  const cursorRef = useRef<{ line: number; ch: number }>({ line: 0, ch: 0 });

  const [users, setUsers] = useState<User[]>([]);
  const [code, setCode] = useState<string>("");
  const [timeOut, setTimeOut] = useState<any>(setTimeout(() => {}, 0));
  const [lang, setLang] = useState("markdown");

  const setLanguage = codeStore((state) => state.setLanguage);
  const setCodeVal = codeStore((state) => state.setCode);

  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const { roomId } = useParams();
  roomIdRef.current = roomId;
  usernameRef.current = username;

  const { toast } = useToast();

  const changeLanguage = (lang: string) => {
    setLang(lang);
  };

  useEffect(() => {
    const init = async () => {
      if (!roomId || !username) {
        router.push("/");
        return;
      }

      setLanguage("markdown");
      setCodeVal("");

      socketRef.current = initSocket();

      socketRef.current.on("connect_error", (err: Error) => {
        handleError(err);
      });
      socketRef.current.on("connect_failed", (err: Error) => {
        handleError(err);
      });

      function handleError(err: Error) {
        toast({
          variant: "destructive",
          description: "Please try again later.",
        });
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
            toast({
              variant: "success",
              description: `${username} joined the room`,
              duration: 1000,
            });
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
          toast({
            variant: "destructive",
            description: `${username} left the room`,
            duration: 1000,
          });
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
      if (setValue) {
        setCode(code);
        /* console.log(cursorRef.current.line, cursorRef.current.ch);
        editorRef.current.focus();
        editorRef.current.setEditor({
          line: cursorRef.current.line,
          ch: cursorRef.current.ch,
        }); */
      }
    });

    socketRef.current.on("sync-code", (code: string) => {
      setCode(code);
    });

    return () => {
      socketRef.current.off("code-change");
    };
  }, [socketRef.current]);

  const codeChange = (editor: any, data: any, value: string) => {
    const val = data.transactions[0].annotations[0].value;
    const isUserEvent = data.transactions[0].isUserEvent(val);
    setCodeInStore(editor);
    clearTimeout(timeOut);
    const head = data.state.selection.main.head;
    //console.log(data.state.doc);
    //console.log(data.state.doc.lineAt(head));
    const cursor = data.state.doc.lineAt(head);
    let line = cursor.number;
    let col = head - cursor.from;
    //console.log("line", line, "col", col);
    cursorRef.current = { line: line, ch: col };

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
    <>
      <Header
        clients={users}
        roomId={roomIdRef.current}
        changeLanguage={changeLanguage}
      />
      <CodeMirror
        value={code}
        onChange={codeChange}
        height="100vh"
        width="99vw"
        extensions={[loadLanguage(lang)]}
      />
    </>
  );
};

export default CodeEditor;
