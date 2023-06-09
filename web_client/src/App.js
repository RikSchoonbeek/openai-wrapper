import React from "react";

import axios from "axios";

import SnippetOverview from "./components/SnippetOverview";
import ChatComponent from "./components/ChatComponent";

import "./css/App.css";
import "./css/chat_component.css";
import "./css/form_component.css";

function App() {
  const handleGetFolders = () => {
    axios
      .get("http://localhost:8000/folder/")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      id="App"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <SnippetOverview />
      <ChatComponent />
    </div>
  );
}

export default App;
