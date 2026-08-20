import React, { useRef, useState } from "react";
import { personalDataObj } from "../../../data/data";
import { capabilityPillars, careerTimeline, enrichedProjects, positioning, systemInfo } from "../../../data/content";
import { appCatalog } from "../config";

const PROMPT = "nitin@os ~ %";

const BANNER = [
  { type: "system", value: `${systemInfo.osName} Terminal v${systemInfo.terminalVersion} — zsh` },
  { type: "output", value: "Type 'help' for commands, or 'neofetch' for a system summary." },
];

/** Right-pad so multi-column output lines up in a monospace column. */
const pad = (value, width) => String(value).padEnd(width, " ");

const TerminalApp = ({ openApp }) => {
  const [lines, setLines] = useState(BANNER);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  const commands = {
    help: () => [
      "AVAILABLE COMMANDS",
      "",
      `  ${pad("whoami", 14)} who Nitin is, in one line`,
      `  ${pad("neofetch", 14)} system summary`,
      `  ${pad("ls", 14)} list everything on this workstation`,
      `  ${pad("skills", 14)} capabilities by layer`,
      `  ${pad("experience", 14)} roles, with measured outcomes`,
      `  ${pad("projects", 14)} every project, with stack`,
      `  ${pad("cat <project>", 14)} read one project case study`,
      `  ${pad("stack", 14)} the short stack summary`,
      `  ${pad("contact", 14)} how to reach him`,
      `  ${pad("hire", 14)} availability and engagement types`,
      `  ${pad("open <app>", 14)} launch an app`,
      `  ${pad("clear", 14)} clear the screen`,
    ],
    whoami: () => [`${personalDataObj.name} — ${positioning.role}, ${positioning.years} years, ${positioning.location}.`, positioning.headline],
    neofetch: () => [
      `${personalDataObj.name}@nitin-os`,
      "-----------------------------",
      `${pad("OS", 14)} ${systemInfo.osName} ${systemInfo.osVersion} (Next.js / React)`,
      `${pad("Role", 14)} ${positioning.role}`,
      `${pad("Experience", 14)} ${positioning.years}`,
      `${pad("Location", 14)} ${positioning.location}`,
      `${pad("Projects", 14)} ${enrichedProjects.length} indexed`,
      `${pad("Companies", 14)} ${careerTimeline.map((role) => role.company).join(", ")}`,
      `${pad("Shell", 14)} zsh`,
      `${pad("Status", 14)} available for work`,
    ],
    ls: () => [
      "APPLICATIONS",
      ...appCatalog.map((app) => `  ${pad(app.file, 20)} ${app.label}`),
      "",
      `PROJECTS  (${enrichedProjects.length})  — run: cat <name>`,
    ],
    skills: () => capabilityPillars.flatMap((pillar) => [
      `${pillar.title.toUpperCase()} — ${pillar.lede}`,
      `  ${pillar.items.join(" · ")}`,
      "",
    ]),
    stack: () => [
      "Frontend  React · Next.js · TypeScript · React Native · Tailwind",
      "Backend   Node.js · Express · NestJS · REST · Socket.io · JWT",
      "Data      MongoDB · PostgreSQL · Supabase · Firebase · Redis",
      "AI        OpenAI · Gemini · Groq · Venice AI",
      "Payments  Stripe · Razorpay · Cybersource · PayPal",
    ],
    experience: () => careerTimeline.flatMap((role) => [
      `${role.period}  ${role.role} — ${role.company}`,
      `  ${role.headline}`,
      ...role.achievements.filter((win) => win.metric).map((win) => `    [${win.metric} ${win.label}] ${win.title}`),
      "",
    ]),
    projects: () => enrichedProjects.map((project, index) => (
      `  ${pad(String(index + 1).padStart(2, "0"), 4)}${pad(project.title, 32)}${pad(project.category, 13)}${project.tech.slice(0, 3).join(", ")}`
    )),
    contact: () => [
      `Email     ${personalDataObj.email}`,
      `Phone     ${personalDataObj.phone}`,
      `LinkedIn  ${personalDataObj.linkedin}`,
      `GitHub    ${personalDataObj.github}`,
      `LeetCode  ${personalDataObj.leetcode}`,
      `Location  ${positioning.location}`,
    ],
    hire: () => [
      "AVAILABLE FOR",
      "  Freelance projects · Contract engagements · Remote roles · Full-time",
      "",
      "WORKS ACROSS",
      "  IST · GMT · EST — typically replies within 24 hours",
      "",
      `Start a conversation: ${personalDataObj.email}`,
    ],
  };

  const run = (input) => {
    const normalized = input.toLowerCase().trim();
    const next = [{ type: "command", value: input }];

    if (normalized === "clear") return null;

    if (normalized.startsWith("open ")) {
      const target = normalized.slice(5).trim();
      const matched = appCatalog.find((app) => app.id === target || app.label.toLowerCase().includes(target));
      if (matched) {
        openApp(matched.id);
        next.push({ type: "success", value: `Opening ${matched.label}...` });
      } else {
        next.push({ type: "error", value: `App '${target}' was not found. Run 'ls' to list applications.` });
      }
      return next;
    }

    if (normalized.startsWith("cat ")) {
      const target = normalized.slice(4).trim();
      const project = enrichedProjects.find((item) => item.slug === target
        || item.title.toLowerCase().includes(target));
      if (!project) {
        next.push({ type: "error", value: `No project matched '${target}'. Run 'projects' to list them.` });
        return next;
      }
      next.push({ type: "output", value: [
        `# ${project.title}`,
        `${project.category} · ${project.type}${project.company ? ` · ${project.company}` : ""} · ${project.duration}`,
        "",
        "PROBLEM",
        `  ${project.problem}`,
        "",
        ...(project.build.length ? ["WHAT I BUILT", ...project.build.map((step, index) => `  ${index + 1}. ${step}`), ""] : []),
        ...(project.impact ? ["OUTCOME", `  ${project.impact}`, ""] : []),
        `ROLE      ${project.role} · ${project.contribution}% ownership · team of ${project.teamSize}`,
        `STACK     ${project.tech.join(", ")}`,
        ...(project.hasLiveLink ? [`LIVE      ${project.link}`] : []),
        ...(project.playStore ? [`ANDROID   ${project.playStore}`] : []),
        ...(project.appStore ? [`IOS       ${project.appStore}`] : []),
        ...(project.hasSource ? [`SOURCE    ${project.git}`] : []),
      ].join("\n") });
      return next;
    }

    const handler = commands[normalized];
    if (handler) {
      next.push({ type: "output", value: handler().join("\n") });
    } else {
      next.push({ type: "error", value: `Command not found: ${input}. Run 'help'.` });
    }
    return next;
  };

  const submit = (event) => {
    event.preventDefault();
    const input = command.trim();
    if (!input) return;

    setHistory((current) => [...current, input]);
    setHistoryIndex(-1);
    const result = run(input);
    setLines(result === null ? [] : (current) => [...current, ...result]);
    setCommand("");
    window.setTimeout(() => terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" }), 0);
  };

  // Up/down walks command history, the way a real shell does.
  const onKeyDown = (event) => {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (!history.length) return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowUp"
      ? Math.min(historyIndex + 1, history.length - 1)
      : Math.max(historyIndex - 1, -1);
    setHistoryIndex(nextIndex);
    setCommand(nextIndex === -1 ? "" : history[history.length - 1 - nextIndex]);
  };

  return (
    <div className="nkos-terminal-app" ref={terminalRef} onClick={(event) => {
      if (!window.getSelection()?.toString()) event.currentTarget.querySelector("input")?.focus();
    }}>
      <div className="nkos-terminal-banner"><span>nitin@portfolio</span><span>zsh · {enrichedProjects.length} projects indexed</span></div>
      {lines.map((line, index) => (
        <div key={`${index}-${line.type}`} className={`nkos-terminal-row ${line.type}`}>
          {line.type === "command" ? <><span>{PROMPT}</span><b>{line.value}</b></> : <p>{line.value}</p>}
        </div>
      ))}
      <form onSubmit={submit} className="nkos-terminal-input">
        <span>{PROMPT}</span>
        <input
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Terminal command"
          autoFocus
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
};

export default TerminalApp;
