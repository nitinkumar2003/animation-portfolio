import React, { useRef, useState } from "react";
import { personalDataObj } from "../../../data/data";
import { appCatalog } from "../config";

const TerminalApp = ({ openApp }) => {
  const [lines, setLines] = useState([
    { type: "system", value: "Nitin OS Terminal v4.2.0" },
    { type: "output", value: "Type 'help' to inspect this workstation." },
  ]);
  const [command, setCommand] = useState("");
  const terminalRef = useRef(null);

  const runCommand = (event) => {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;
    const normalized = input.toLowerCase();
    const nextLines = [...lines, { type: "command", value: input }];

    if (normalized === "clear") {
      setLines([]);
      setCommand("");
      return;
    }

    const responses = {
      help: "Commands: whoami, stack, projects, experience, contact, open <app>, clear",
      whoami: "Nitin Kumar — Full Stack Developer building React, Next.js, Node.js and AI products.",
      stack: "Frontend: React/Next/TS | Backend: Node/Nest/Express | Data: Mongo/Postgres/Supabase | AI: OpenAI/Gemini",
      projects: `${personalDataObj.projects.length} project systems indexed. Run: open projects`,
      experience: "4+ years | iByte Infomatics + Ideahelix Pvt. Ltd.",
      contact: `Email: ${personalDataObj.email}`,
    };

    if (normalized.startsWith("open ")) {
      const target = normalized.replace("open ", "").trim();
      const matched = appCatalog.find((app) => app.id === target || app.label.toLowerCase().includes(target));
      if (matched) {
        openApp(matched.id);
        nextLines.push({ type: "success", value: `Opening ${matched.label}...` });
      } else nextLines.push({ type: "error", value: `App '${target}' was not found.` });
    } else nextLines.push({ type: responses[normalized] ? "output" : "error", value: responses[normalized] || `Command not found: ${input}` });

    setLines(nextLines);
    setCommand("");
    window.setTimeout(() => terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" }), 0);
  };

  return (
    <div className="nkos-terminal-app" ref={terminalRef}>
      <div className="nkos-terminal-banner"><span>nitin@portfolio</span><span>zsh</span></div>
      {lines.map((line, index) => <div key={`${line.value}-${index}`} className={`nkos-terminal-row ${line.type}`}>{line.type === "command" ? <><span>nitin@os ~ %</span><b>{line.value}</b></> : <p>{line.value}</p>}</div>)}
      <form onSubmit={runCommand} className="nkos-terminal-input"><span>nitin@os ~ %</span><input value={command} onChange={(event) => setCommand(event.target.value)} aria-label="Terminal command" autoFocus autoComplete="off" spellCheck="false" /></form>
    </div>
  );
};

export default TerminalApp;
