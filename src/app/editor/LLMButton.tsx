"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
const Groq = require("groq-sdk");
import MarkdownPreview from "@uiw/react-markdown-preview";

export function LLMButton() {
  const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const [userMessage, setUserMessage] = useState<string>("");
  const [llmResponse, setLlmResponse] = useState<string>("");

  const chat = async () => {
    const completion = await getGroqChatCompletion();
    setLlmResponse(completion.choices[0].message.content);
  };

  async function getGroqChatCompletion() {
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <img src="/zap.svg" alt="" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"} className="h-3/4 overflow-scroll">
        <SheetHeader>
          <SheetTitle>Chat with your code</SheetTitle>
          <SheetDescription>
            Unravel the complexities of your code with your AI-powered coding
            assistant that explains your code, enhancing your understanding and
            productivity. <br />
            <br />
            Give an appropriate prompt to the AI to get the best results.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <textarea
            name=""
            id=""
            placeholder="Write your query here"
            className=" border border-gray-500 rounded-lg p-2 w-full mt-4 "
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <Button onClick={chat} className="flex-none">
            Chat
          </Button>
          <div className="wmde-markdown-var"> </div>
          <MarkdownPreview
            source={llmResponse}
            className="p-2  border border-gray-500 rounded-lg"
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
