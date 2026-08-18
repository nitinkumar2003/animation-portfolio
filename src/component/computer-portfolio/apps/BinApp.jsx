import React from "react";
import { FiFile, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { appCatalog } from "../config";
import { getLocale } from "../lib/osUtils";

const BinApp = ({ deletedItems, onRestore, onRestoreAll, preferences, t }) => (
  <div className="nkos-bin-app">
    <header><div><FiTrash2 /><span><b>{t("recycleBin")}</b><small>{deletedItems.length} {t("deletedItems")}</small></span></div>{deletedItems.length > 0 && <button type="button" onClick={onRestoreAll}><FiRotateCcw /> {t("restoreAll")}</button>}</header>
    {deletedItems.length ? <div className="nkos-bin-list">
      <div className="nkos-bin-head"><span>{t("name")}</span><span>{t("deleted")}</span><span>{t("action")}</span></div>
      {deletedItems.map((item) => {
        const app = appCatalog.find((entry) => entry.id === item.id);
        const Icon = app?.icon || FiFile;
        return <div key={item.id}><span className="nkos-bin-file" style={{ "--app-color": app?.color }}><Icon /></span><span><b>{item.name}</b><small>{app?.label}</small></span><time>{new Date(item.deletedAt).toLocaleString(getLocale(preferences), { timeZone: preferences.timezone })}</time><button type="button" onClick={() => onRestore(item.id)}><FiRotateCcw /> {t("restore")}</button></div>;
      })}
    </div> : <div className="nkos-bin-empty"><FiTrash2 /><h3>{t("emptyBin")}</h3><p>{t("binCopy")}</p></div>}
  </div>
);

export default BinApp;
