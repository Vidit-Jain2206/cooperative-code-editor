import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Editor } from "@monaco-editor/react";

const ENDPOINT = "https://cooperative-code-editor.onrender.com";
var socket;
var id;
const Code = () => {
  const editorRef = useRef();
  const [value, setValue] = useState();
  const [socketConnection, setSocketConnection] = useState(false);

  const onMount = (editor) => {
    editorRef.current = editor;
  };

  const handleChange = (value) => {
    if (socketConnection) {
      setValue(value);
      socket.emit("code: change", { value, id });
    } else {
      console.log("Not connected to server");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    id = Math.floor(Math.random() * 1000);
    socket.emit("setup", { id });
    socket.on("joined", () => {
      setSocketConnection(true);
    });

    socket.on("code: new", ({ value, user }) => {
      if (user !== id) {
        setValue(value);
      }
    });
  }, []);

  return (
    <div>
      <Editor
        height="100vh"
        width="100vw"
        theme="vs-dark"
        language="javascript"
        defaultLanguage="javascript"
        defaultValue={`\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`}
        onMount={onMount}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default Code;
