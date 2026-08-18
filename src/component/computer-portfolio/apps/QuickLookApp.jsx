import React from "react";
import { FiCheck, FiEye, FiFileText, FiLock } from "react-icons/fi";

const QuickLookApp = ({ item }) => {
  const content = item?.content || "";
  const lines = content.split("\n");

  return (
    <div className="nkos-editor-app nkos-quick-look-app">
      <header>
        <div><FiFileText /><span><b>{item?.name || "Quick Look"}</b><small>QUICK LOOK · UTF-8</small></span></div>
        <div><span>{content.length} characters</span><em><FiLock /> Read only</em></div>
      </header>
      <div className="nkos-editor-workspace">
        <aside>{lines.map((_, index) => <span key={index}>{index + 1}</span>)}</aside>
        <pre aria-label={`Quick Look preview of ${item?.name || "file"}`}>{content}</pre>
      </div>
      <footer><span><FiCheck /> Portfolio content protected</span><span><FiEye /> Quick Look</span><span>{lines.length} lines</span></footer>
    </div>
  );
};

export default QuickLookApp;
