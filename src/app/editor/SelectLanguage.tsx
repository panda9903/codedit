import * as React from "react";
import { codeStore, dataStore, socketStore } from "@/store/codeStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectLanguage({
  changeLanguage,
}: {
  changeLanguage: (lang: string) => void;
}) {
  const setLanguage = codeStore((state) => state.setLanguage);
  const language = codeStore((state) => state.language);
  const socket = socketStore((state) => state.socket);
  const roomId = dataStore((state) => state.roomId);

  return (
    <Select
      value={language}
      onValueChange={(value) => {
        changeLanguage(value);
        setLanguage(value);

        socket.emit("change-language", {
          roomId: roomId,
          language: value,
        });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          <SelectItem value="c">C</SelectItem>
          <SelectItem value="cpp">C++</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="javascript">JavaScript</SelectItem>
          <SelectItem value="typescript">TypeScript</SelectItem>
          <SelectItem value="swift">Swift</SelectItem>
          <SelectItem value="rust">Rust</SelectItem>
          <SelectItem value="go">Go</SelectItem>
          <SelectItem value="kotlin">Kotlin</SelectItem>
          <SelectItem value="php">PHP</SelectItem>
          <SelectItem value="sql">SQL</SelectItem>
          <SelectItem value="xml">XML</SelectItem>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="css">CSS</SelectItem>
          <SelectItem value="jsx">JSX</SelectItem>
          <SelectItem value="tsx">TSX</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="markdown">Markdown</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
