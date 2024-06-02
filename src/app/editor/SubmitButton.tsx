import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
import { codeStore } from "@/store/codeStore";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function SubmitButton() {
  const code = codeStore((state) => state.code);
  const language = codeStore((state) => state.language);
  const [input, setInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const whiteListedLanguages = [
    "c",
    "cpp",
    "python",
    "java",
    "javascript",
    "typescript",
    "rust",
    "go",
    "php",
  ];

  const values = {
    code: code,
    code_language: language,
    stdin: input || "",
    stdout: expectedOutput,
  };

  const runCode = async () => {
    console.log(values);

    if (language === "") {
      toast({
        title: "Select language",
        description: "Please select a language",
        variant: "destructive",
      });
      return;
    }

    if (code === "") {
      toast({
        title: "Empty code",
        description: "Please write some code",
        variant: "destructive",
      });
      return;
    }

    const res = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data);
    console.log(data.statusOfCode);
    if (data.statusOfCode == "Accepted") {
      console.log(data.outputofCode);
      setOutput(data.outputofCode);
    } else {
      if (data.compileError.length > data.stderr.length) {
        setOutput(data.compileError);
      } else {
        setOutput(data.stderr);
      }
    }
    toast({
      title: data.statusOfCode,
      description: "Please check the results",
      variant: data.statusOfCode === "Accepted" ? "success" : "destructive",
    });
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        className={cn(
          whiteListedLanguages.includes(language) ? "visited" : "invisible"
        )}
      >
        <Button variant="outline">Run</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>Enter input and expected output</SheetDescription>
        </SheetHeader>
        <div className="grid gap-8 mt-8 py-4">
          <div className="flex flex-col  gap-4">
            <Label htmlFor="input" className="text-left">
              Input
            </Label>
            <textarea
              onChange={(e) => setInput(e.target.value)}
              id="input"
              value={input}
              className="col-span-3 border border-gray-500 text-black p-2 text-sm"
            />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="expected output" className="text-left">
              Expected Output
            </Label>
            <textarea
              onChange={(e) => setExpectedOutput(e.target.value)}
              id="expected output"
              value={expectedOutput}
              className="col-span-3 border border-gray-500 text-black p-2 text-sm"
            />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit" onClick={runCode}>
            Run
          </Button>
        </SheetFooter>
        <Label htmlFor="output" className="text-left">
          Output
        </Label>
        <textarea
          name="Output"
          value={output}
          id=""
          placeholder="Your output will be displayed here"
          readOnly
          className="border h-80 border-gray-500 text-black w-full mt-8 placeholder:text-sm p-2 text-sm placeholder-gray-500"
        ></textarea>
      </SheetContent>
    </Sheet>
  );
}
