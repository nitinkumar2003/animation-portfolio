import React, { useCallback, useEffect, useState } from "react";
import { FiCheck, FiFileText, FiSave } from "react-icons/fi";

const EditorApp = ({ item, onSave, t }) => {
  const [draft, setDraft] = useState(item?.content || "");
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    setDraft(item?.content || "");
    setSavedAt("");
  }, [item?.id, item?.content]);

  const save = useCallback(() => {
    if (!item) return;
    onSave(item.id, draft);
    setSavedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [draft, item, onSave]);

  useEffect(() => {
    const handleSaveShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        save();
      }
    };
    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [save]);

  return (
    <div className="nkos-editor-app">
      <header>
        <div><FiFileText /><span><b>{item?.name || "Workspace.nk"}</b><small>LOCAL FILE · UTF-8</small></span></div>
        <div><span>{draft.length} characters</span>{savedAt && <em>Saved {savedAt}</em>}<button type="button" onClick={save}><FiSave /> {t("save")}</button></div>
      </header>
      <div className="nkos-editor-workspace"><aside>{draft.split("\n").map((_, index) => <span key={index}>{index + 1}</span>)}</aside><textarea value={draft} onChange={(event) => setDraft(event.target.value)} aria-label={`Edit ${item?.name || "file"}`} spellCheck="true" /></div>
      <footer><span><FiCheck /> Browser-local persistence</span><span>Markdown / Plain text</span><span>Ln {draft.split("\n").length}, Col 1</span></footer>
    </div>
  );
};

export default EditorApp;
