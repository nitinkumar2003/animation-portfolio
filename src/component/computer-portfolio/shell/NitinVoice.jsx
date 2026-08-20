import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiMic, FiMicOff, FiSend, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import { appCatalog } from "../config";
import { resumeLocale } from "../../../data/resumeI18n";

/**
 * Nitin Voice — the OS-level spoken assistant.
 *
 * Local intents ("open projects", "switch to light mode") are executed instantly
 * without a network round trip. Anything else goes to the same scoped /api/ask-nitin
 * endpoint the text assistant uses, streamed back and read aloud.
 *
 * Speech recognition is Chromium/Safari-only, so the panel always offers typing too.
 */

const getRecognition = () => {
  if (typeof window === "undefined") return null;
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  return Recognition ? new Recognition() : null;
};

/** Match a spoken phrase against an app's label, filename and keyword list. */
const findApp = (phrase) => {
  const words = phrase.toLowerCase();
  return appCatalog.find((app) => words.includes(app.label.toLowerCase()))
    || appCatalog.find((app) => app.keywords.split(" ").some((keyword) => keyword.length > 3 && words.includes(keyword)))
    || null;
};

const PROMPTS = [
  "Open the project explorer",
  "Switch to light mode",
  "What has Nitin shipped to production?",
  "Is he available for contract work?",
];

const NitinVoice = ({ onClose, openApp, setPreferences, preferences, pushNotification }) => {
  const [status, setStatus] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [answer, setAnswer] = useState("");
  const [typed, setTyped] = useState("");
  const [speechOn, setSpeechOn] = useState(true);
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef(null);
  const abortRef = useRef(null);
  const speechOnRef = useRef(speechOn);
  speechOnRef.current = speechOn;

  const speak = useCallback((text) => {
    if (!speechOnRef.current || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 600));
    utterance.lang = resumeLocale(preferences?.language || "en");
    utterance.rate = 1.03;
    utterance.pitch = 1;
    utterance.onend = () => setStatus("idle");
    setStatus("speaking");
    window.speechSynthesis.speak(utterance);
  }, [preferences]);

  /** Returns a spoken confirmation when the phrase maps to a local OS action. */
  const runLocalIntent = useCallback((phrase) => {
    const words = phrase.toLowerCase().trim();
    if (!words) return null;

    if (/\b(close|dismiss|stop|goodbye|exit)\b/.test(words) && words.length < 24) {
      onClose();
      return "Closing.";
    }
    if (/\b(light|day)\s*(mode|theme)?\b/.test(words) && /light/.test(words)) {
      setPreferences((current) => ({ ...current, theme: "light" }));
      return "Switched to light mode.";
    }
    if (/\b(dark|night)\s*(mode|theme)?\b/.test(words) && /dark|night/.test(words)) {
      setPreferences((current) => ({ ...current, theme: "dark" }));
      return "Switched to dark mode.";
    }
    if (/\b(open|show|launch|go to|take me to|start)\b/.test(words)) {
      const app = findApp(words);
      if (app) {
        openApp(app.id);
        return `Opening ${app.label}.`;
      }
    }
    return null;
  }, [onClose, openApp, setPreferences]);

  const ask = useCallback(async (question) => {
    const clean = question.trim().slice(0, 500);
    if (!clean) return;

    setTranscript(clean);
    setTyped("");

    const local = runLocalIntent(clean);
    if (local) {
      setAnswer(local);
      pushNotification?.(local);
      speak(local);
      return;
    }

    setStatus("thinking");
    setAnswer("");
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/ask-nitin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: clean, history: [], stream: true }),
        signal: controller.signal,
      });

      if (!response.body) {
        const text = await response.text();
        setAnswer(text);
        speak(text);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      const final = text.trim();
      setAnswer(final);
      if (final) speak(final); else setStatus("idle");
    } catch (error) {
      if (error?.name !== "AbortError") {
        const message = "Nitin Voice could not reach the assistant. Please try the Ask Nitin app.";
        setAnswer(message);
        setStatus("idle");
      }
    } finally {
      abortRef.current = null;
    }
  }, [runLocalIntent, speak, pushNotification]);

  const startListening = useCallback(() => {
    const recognition = getRecognition();
    if (!recognition) {
      setSupported(false);
      return;
    }

    recognitionRef.current?.abort?.();
    recognition.lang = resumeLocale(preferences?.language || "en");
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => { setStatus("listening"); setAnswer(""); setTranscript(""); };
    recognition.onerror = (event) => {
      setStatus("idle");
      if (event.error === "not-allowed") setAnswer("Microphone access was blocked. You can type your question instead.");
    };
    recognition.onresult = (event) => {
      const text = Array.from(event.results).map((result) => result[0].transcript).join("");
      setTranscript(text);
      if (event.results[event.results.length - 1].isFinal) ask(text);
    };
    recognition.onend = () => setStatus((current) => (current === "listening" ? "idle" : current));

    recognitionRef.current = recognition;
    try { recognition.start(); } catch { /* already running */ }
  }, [ask, preferences]);

  const stopEverything = useCallback(() => {
    recognitionRef.current?.abort?.();
    abortRef.current?.abort?.();
    window.speechSynthesis?.cancel?.();
    setStatus("idle");
  }, []);

  useEffect(() => {
    setSupported(Boolean(getRecognition()));
    return () => {
      recognitionRef.current?.abort?.();
      abortRef.current?.abort?.();
      window.speechSynthesis?.cancel?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") { stopEverything(); onClose(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, stopEverything]);

  const label = status === "listening" ? "Listening…"
    : status === "thinking" ? "Thinking…"
      : status === "speaking" ? "Speaking…"
        : supported ? "Tap the orb and speak" : "Type your question";

  return (
    <motion.div
      className="nkos-voice-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={() => { stopEverything(); onClose(); }}
    >
      <motion.section
        className="nkos-voice"
        data-status={status}
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Nitin Voice assistant"
      >
        <header>
          <span><b>Nitin Voice</b><small>{label}</small></span>
          <button type="button" onClick={() => setSpeechOn((value) => !value)} aria-label={speechOn ? "Mute replies" : "Unmute replies"}>
            {speechOn ? <FiVolume2 /> : <FiVolumeX />}
          </button>
          <button type="button" onClick={() => { stopEverything(); onClose(); }} aria-label="Close Nitin Voice"><FiX /></button>
        </header>

        <button
          type="button"
          className="nkos-voice-orb"
          onClick={() => (status === "listening" ? stopEverything() : startListening())}
          aria-label={status === "listening" ? "Stop listening" : "Start listening"}
          disabled={!supported}
        >
          <span className="nkos-voice-orb__core">{status === "listening" ? <FiMic /> : supported ? <FiMic /> : <FiMicOff />}</span>
          <span className="nkos-voice-orb__ring" />
          <span className="nkos-voice-orb__ring nkos-voice-orb__ring--slow" />
          <span className="nkos-voice-wave" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <i key={index} />)}
          </span>
        </button>

        <div className="nkos-voice-stream">
          {transcript && <p className="nkos-voice-you">“{transcript}”</p>}
          {answer && <p className="nkos-voice-answer">{answer}</p>}
          {!transcript && !answer && (
            <div className="nkos-voice-prompts">
              {PROMPTS.map((prompt) => (
                <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}</button>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={(event) => { event.preventDefault(); ask(typed); }}>
          <input
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={supported ? "…or type a question" : "Type a question"}
            maxLength={500}
            aria-label="Type a question for Nitin Voice"
          />
          <button type="submit" disabled={!typed.trim()} aria-label="Send"><FiSend /></button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default NitinVoice;
