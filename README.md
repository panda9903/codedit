# codEdit

codEdit is a collaborative coding platform. 

## Features
- Multiple people collaborating on a single code file
- Can run the code in the platform itself
- Interactions with LLM to understand code and help in debugging
- Check the participants in the room

**Tech Stack** - Nextjs, CodeMirror, Socket.io, Express

---


### Running locally

- Clone the repo
- In the terminal, type `npm install` to install the dependencies
- Create a `.env` file
- Copy the following content `NEXT_PUBLIC_GROQ_API_KEY=xxxxxx`
- Replace your Groq API key
- Start the backend
- Type `npm run dev` to start the application locally in `localhost:3000`
- Open `app/page.tsx` to edit the content


