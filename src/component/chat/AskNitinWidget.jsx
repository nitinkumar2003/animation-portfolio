"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowUp, FiChevronRight, FiRefreshCw, FiSquare, FiX } from "react-icons/fi";
import profileImg from "../../assets/images.jpg";
import { personalDataObj } from "../../data/data";
import { usePreferences } from "../site/Preferences";
import "../../styles/chat.css";

const STORAGE_KEY = "nk-ask-nitin-thread";

const OPENERS = [
  "What has Nitin actually shipped to production?",
  "Is he available for freelance or contract work?",
  "Walk me through his strongest AI project.",
  "Why should I hire him over another React developer?",
];

const FOLLOW_UPS = [
  "What's his backend experience?",
  "Has he published mobile apps?",
  "What measurable results has he delivered?",
  "How do I contact him?",
];

const GREETING = {
  role: "assistant",
  content:
    "Hi — I'm Nitin's portfolio assistant. I answer from his verified resume and project history, so ask me anything about his experience, stack, projects or availability.",
};

/** Chat-bubble-with-spark mark used on the launcher and the empty state. */
const ChatMark = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20.5 11.4c0 4.2-3.8 7.6-8.5 7.6-.9 0-1.8-.1-2.6-.4l-4.6 1.6a.5.5 0 0 1-.6-.7l1.3-3.6C4 14.6 3.5 13 3.5 11.4 3.5 7.2 7.3 3.8 12 3.8s8.5 3.4 8.5 7.6Z"
      fill="currentColor"
      opacity="0.95"
    />
    <path
      d="M12.05 7.3l.72 1.86 1.86.72-1.86.72-.72 1.86-.72-1.86-1.86-.72 1.86-.72.72-1.86Z"
      fill="#04120d"
    />
    <circle cx="15.6" cy="13.4" r="0.85" fill="#04120d" />
  </svg>
);

const readStoredThread = () => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [GREETING];
  } catch {
    return [GREETING];
  }
};

const AskNitinWidget = () => {
  const { t } = usePreferences();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [nudgeVisible, setNudgeVisible] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const launcherRef = useRef(null);
  const abortRef = useRef(null);

  // Restore a thread started earlier in the same tab.
  useEffect(() => { setMessages(readStoredThread()); }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24)));
    } catch { /* quota or private mode — the thread just won't persist */ }
  }, [messages]);

  // Invite first-time visitors once, and never again in this tab.
  useEffect(() => {
    if (window.sessionStorage.getItem("nk-ask-nitin-nudged")) return undefined;
    const timer = window.setTimeout(() => setNudgeVisible(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissNudge = useCallback(() => {
    setNudgeVisible(false);
    try { window.sessionStorage.setItem("nk-ask-nitin-nudged", "1"); } catch { /* ignore */ }
  }, []);

  const scrollToEnd = useCallback((behavior = "smooth") => {
    requestAnimationFrame(() => {
      const node = scrollRef.current;
      if (node) node.scrollTo({ top: node.scrollHeight, behavior });
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    dismissNudge();
    scrollToEnd("auto");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKey = (event) => {
      if (event.key === "Escape") { setOpen(false); launcherRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", onKey); };
  }, [open, dismissNudge, scrollToEnd]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStreaming(false);
  }, []);

  const send = useCallback(async (raw) => {
    const question = raw.trim().slice(0, 800);
    if (!question || streaming) return;

    const history = messages
      .filter((message) => !message.error)
      .slice(-8)
      .map(({ role, content }) => ({ role, content }));

    setMessages((current) => [...current, { role: "user", content: question }, { role: "assistant", content: "", pending: true }]);
    setDraft("");
    setStreaming(true);
    scrollToEnd();

    const controller = new AbortController();
    abortRef.current = controller;

    /** Commit streamed text into the trailing assistant message. */
    const writeAssistant = (text, extra = {}) => setMessages((current) => {
      const next = [...current];
      next[next.length - 1] = { role: "assistant", content: text, ...extra };
      return next;
    });

    try {
      const response = await fetch("/api/ask-nitin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history, stream: true }),
        signal: controller.signal,
      });

      if (!response.body) {
        const fallback = await response.text();
        writeAssistant(fallback || "Ask Nitin is temporarily unavailable.", { error: !response.ok });
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";

      // Render tokens as they arrive so the answer types out.
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        writeAssistant(text, { pending: true });
        scrollToEnd();
      }
      writeAssistant(text.trim() || "Ask Nitin could not produce an answer. Please try again.");
    } catch (error) {
      if (error?.name === "AbortError") {
        setMessages((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          next[next.length - 1] = { role: "assistant", content: last.content || "Stopped.", stopped: true };
          return next;
        });
      } else {
        writeAssistant(`Ask Nitin is temporarily unavailable. Please email ${personalDataObj.email} instead.`, { error: true });
      }
    } finally {
      abortRef.current = null;
      setStreaming(false);
      scrollToEnd();
    }
  }, [messages, streaming, scrollToEnd]);

  const reset = () => {
    stop();
    setMessages([GREETING]);
    setDraft("");
    try { window.sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    inputRef.current?.focus();
  };

  const onDraftChange = (event) => {
    setDraft(event.target.value);
    const node = event.target;
    node.style.height = "auto";
    node.style.height = `${Math.min(node.scrollHeight, 120)}px`;
  };

  const isEmptyThread = messages.length === 1;
  const lastMessage = messages[messages.length - 1];
  const showFollowUps = !streaming && !isEmptyThread && lastMessage?.role === "assistant" && !lastMessage?.error;

  return (
    <div className="nkc" data-open={open}>
      {!open && nudgeVisible && (
        <div className="nkc-nudge" role="status">
          <span>{t("assistantNudge")}</span>
          <button type="button" className="nkc-nudge__dismiss" onClick={dismissNudge} aria-label={t("close")}>
            <FiX />
          </button>
        </div>
      )}

      {open && (
        <div className="nkc-panel" role="dialog" aria-modal="false" aria-label={t("askNitin")}>
          <header className="nkc-head">
            <span className="nkc-head__avatar">
              <img src={profileImg.src} alt="" />
              <i />
            </span>
            <span className="nkc-head__id">
              <b>{t("askNitin")}</b>
              <span>{t("assistantSubtitle")}</span>
            </span>
            <button type="button" onClick={reset} title={t("newConversation")} aria-label={t("newConversation")}>
              <FiRefreshCw />
            </button>
            <button type="button" onClick={() => setOpen(false)} title={t("close")} aria-label={t("close")}>
              <FiX />
            </button>
          </header>

          <div className="nkc-stream" ref={scrollRef}>
            {isEmptyThread ? (
              <div className="nkc-intro">
                <span className="nkc-intro__mark"><ChatMark /></span>
                <h3>{t("askNitin")}</h3>
                <p>{GREETING.content}</p>
                <div className="nkc-suggestions">
                  {OPENERS.map((opener) => (
                    <button type="button" key={opener} onClick={() => send(opener)}>
                      {opener}
                      <FiChevronRight />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`nkc-msg nkc-msg--${message.role}${message.error ? " nkc-msg--error" : ""}`}
                >
                  {message.role === "assistant" && <span className="nkc-msg__avatar">NK</span>}
                  <div className="nkc-msg__text">
                    {message.role === "assistant" && message.pending && !message.content ? (
                      <span className="nkc-thinking" aria-label="Thinking"><i /><i /><i /></span>
                    ) : (
                      <>
                        {message.content.split(/\n{2,}/).map((block, blockIndex) => (
                          <p key={blockIndex}>{block}</p>
                        ))}
                        {message.pending && <span className="nkc-caret" aria-hidden="true" />}
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {showFollowUps && (
            <div className="nkc-followups">
              {FOLLOW_UPS.map((item) => (
                <button type="button" key={item} onClick={() => send(item)}>{item}</button>
              ))}
            </div>
          )}

          <form
            className="nkc-composer"
            onSubmit={(event) => { event.preventDefault(); send(draft); }}
          >
            <div className="nkc-composer__field">
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                maxLength={800}
                onChange={onDraftChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(draft); }
                }}
                placeholder={t("assistantPlaceholder")}
                aria-label={t("assistantPlaceholder")}
              />
              {streaming ? (
                <button type="button" className="nkc-send nkc-send--stop" onClick={stop} aria-label={t("stopGenerating")}>
                  <FiSquare />
                </button>
              ) : (
                <button type="submit" className="nkc-send" disabled={!draft.trim()} aria-label={t("send")}>
                  <FiArrowUp />
                </button>
              )}
            </div>
            <div className="nkc-composer__foot">
              <span>{t("assistantDisclaimer")}</span>
              <a href={`mailto:${personalDataObj.email}`}>{t("emailInstead")}</a>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        ref={launcherRef}
        className="nkc-launcher"
        onClick={() => { setOpen((value) => !value); dismissNudge(); }}
        aria-expanded={open}
        aria-label={open ? t("close") : t("askNitin")}
      >
        {!open && <span className="nkc-launcher__ring" aria-hidden="true" />}
        <ChatMark className="nkc-launcher__open" />
        <FiX className="nkc-launcher__close" />
      </button>
    </div>
  );
};

export default AskNitinWidget;
