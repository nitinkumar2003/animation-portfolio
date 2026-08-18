import React, { useRef, useState } from "react";
import { FiCpu, FiMessageCircle, FiRefreshCw, FiSend, FiShield } from "react-icons/fi";
import profileImg from "../../../assets/images.jpg";

const suggestions = [
  "Which projects best demonstrate Nitin's full stack experience?",
  "Is Nitin available for remote or freelance work?",
  "What AI and payment integrations has Nitin worked with?",
  "Which role would be the strongest fit for Nitin?",
];

const initialMessage = {
  role: "assistant",
  content: "Hi, I am Nitin's profile assistant. I can answer verified questions about his work, projects, skills, experience, and availability.",
};

const AskNitinApp = () => {
  const [messages, setMessages] = useState([initialMessage]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const ask = async (value) => {
    const cleanQuestion = value.trim().slice(0, 800);
    if (!cleanQuestion || loading) return;
    const history = messages.slice(-8);
    const nextMessages = [...messages, { role: "user", content: cleanQuestion }];
    setMessages(nextMessages); setQuestion(""); setLoading(true);
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
    try {
      const response = await fetch("/api/ask-nitin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: cleanQuestion, history }),
      });
      const result = await response.json();
      const content = response.ok ? result.answer : result.error;
      setMessages((current) => [...current, { role: "assistant", content: content || "Ask Nitin is temporarily unavailable.", error: !response.ok }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "Ask Nitin is temporarily unavailable. Please use the Contact app.", error: true }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }));
    }
  };

  const submit = (event) => { event.preventDefault(); ask(question); };

  return <div className="nkos-assistant-app"><aside><div className="nkos-assistant-profile"><span><img src={profileImg.src} alt="Nitin Kumar" /><i /></span><h2>Ask Nitin</h2><p>PROFILE INTELLIGENCE</p></div><div className="nkos-assistant-status"><span><FiShield /><b>Verified context</b><small>Resume + portfolio dataset</small></span><span><FiCpu /><b>Scoped assistant</b><small>Nitin-related answers only</small></span></div><button type="button" onClick={() => { setMessages([initialMessage]); setQuestion(""); }}><FiRefreshCw /> New conversation</button></aside><main><header><span><FiMessageCircle /><b>Nitin Kumar</b><small>Professional profile assistant</small></span><em><i /> ONLINE</em></header><div className="nkos-assistant-messages" ref={scrollRef}>{messages.map((message, index) => <article key={`${message.role}-${index}`} className={`${message.role} ${message.error ? "error" : ""}`}><span>{message.role === "assistant" ? "NK" : "YOU"}</span><p>{message.content}</p></article>)}{loading && <article className="assistant loading"><span>NK</span><p><i /><i /><i /></p></article>}</div>{messages.length === 1 && <div className="nkos-assistant-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => ask(suggestion)}>{suggestion}</button>)}</div>}<form onSubmit={submit}><textarea value={question} onChange={(event) => setQuestion(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); ask(question); } }} placeholder="Ask about Nitin's experience, projects, stack, or availability" maxLength={800} rows={1} aria-label="Question for Nitin's profile assistant" /><span>{question.length}/800</span><button type="submit" disabled={!question.trim() || loading} aria-label="Send question"><FiSend /></button></form></main></div>;
};

export default AskNitinApp;
