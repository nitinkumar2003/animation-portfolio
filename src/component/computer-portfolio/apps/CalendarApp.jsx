import React, { useMemo, useState } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { languages } from "../config";
import { loadStoredValue, persistStoredValue } from "../lib/osUtils";

const STORAGE_KEY = "nkos-calendar-events";
const pad = (value) => String(value).padStart(2, "0");
const dateKey = (year, month, day) => `${year}-${pad(month + 1)}-${pad(day)}`;

const zonedToday = (timezone) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return { year: Number(values.year), month: Number(values.month) - 1, day: Number(values.day) };
};

const emptyDraft = (date) => ({ id: "", title: "", date, time: "10:00", category: "Client", notes: "" });

const CalendarApp = ({ preferences }) => {
  const today = useMemo(() => zonedToday(preferences.timezone), [preferences.timezone]);
  const locale = languages.find((item) => item.id === preferences.language)?.locale || "en-GB";
  const [view, setView] = useState({ year: today.year, month: today.month });
  const [selectedDate, setSelectedDate] = useState(dateKey(today.year, today.month, today.day));
  const [events, setEvents] = useState(() => loadStoredValue(STORAGE_KEY, []));
  const [draft, setDraft] = useState(null);

  const saveEvents = (nextEvents) => {
    setEvents(nextEvents);
    persistStoredValue(STORAGE_KEY, nextEvents);
  };

  const weekdays = useMemo(() => Array.from({ length: 7 }, (_, index) => (
    new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2024, 0, 7 + index)))
  )), [locale]);

  const cells = useMemo(() => {
    const firstWeekday = new Date(Date.UTC(view.year, view.month, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(view.year, view.month + 1, 0)).getUTCDate();
    return Array.from({ length: 42 }, (_, index) => {
      const day = index - firstWeekday + 1;
      return day > 0 && day <= daysInMonth ? { day, key: dateKey(view.year, view.month, day) } : null;
    });
  }, [view]);

  const selectedEvents = events
    .filter((event) => event.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const moveMonth = (offset) => {
    const next = new Date(Date.UTC(view.year, view.month + offset, 1));
    const nextView = { year: next.getUTCFullYear(), month: next.getUTCMonth() };
    setView(nextView);
    setSelectedDate(dateKey(nextView.year, nextView.month, 1));
    setDraft(null);
  };

  const resetToday = () => {
    setView({ year: today.year, month: today.month });
    setSelectedDate(dateKey(today.year, today.month, today.day));
    setDraft(null);
  };

  const submitEvent = (event) => {
    event.preventDefault();
    const title = draft.title.trim();
    if (!title) return;
    const calendarEvent = {
      ...draft,
      title: title.slice(0, 70),
      notes: draft.notes.trim().slice(0, 240),
      id: draft.id || (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`),
    };
    const nextEvents = draft.id
      ? events.map((item) => item.id === draft.id ? calendarEvent : item)
      : [...events, calendarEvent];
    saveEvents(nextEvents);
    setSelectedDate(calendarEvent.date);
    setDraft(null);
  };

  const monthTitle = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(Date.UTC(view.year, view.month, 1)));
  const selectedTitle = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" })
    .format(new Date(`${selectedDate}T00:00:00Z`));

  return (
    <div className="nkos-calendar-app">
      <section className="nkos-calendar-main">
        <header>
          <div><FiCalendar /><span><b>{monthTitle}</b><small>{preferences.timezone}</small></span></div>
          <nav><button type="button" onClick={resetToday}>Today</button><button type="button" onClick={() => moveMonth(-1)} aria-label="Previous month"><FiChevronLeft /></button><button type="button" onClick={() => moveMonth(1)} aria-label="Next month"><FiChevronRight /></button></nav>
        </header>
        <div className="nkos-calendar-weekdays">{weekdays.map((day) => <span key={day}>{day}</span>)}</div>
        <div className="nkos-calendar-grid">
          {cells.map((cell, index) => cell ? <button type="button" key={cell.key} className={`${cell.key === selectedDate ? "selected" : ""} ${cell.key === dateKey(today.year, today.month, today.day) ? "today" : ""}`} onClick={() => { setSelectedDate(cell.key); setDraft(null); }}><span>{cell.day}</span>{events.some((event) => event.date === cell.key) && <i>{events.filter((event) => event.date === cell.key).length}</i>}</button> : <span key={`blank-${index}`} />)}
        </div>
      </section>
      <aside className="nkos-calendar-agenda">
        <header><div><small>SCHEDULE</small><h2>{selectedTitle}</h2></div><button type="button" onClick={() => setDraft(emptyDraft(selectedDate))} aria-label="Add event" title="Add event"><FiPlus /></button></header>
        <div className="nkos-agenda-list">
          {selectedEvents.map((item) => <article key={item.id} data-category={item.category.toLowerCase()}><time><FiClock /> {item.time}</time><h3>{item.title}</h3><span>{item.category}</span>{item.notes && <p>{item.notes}</p>}<footer><button type="button" onClick={() => setDraft({ ...item })} aria-label={`Edit ${item.title}`}><FiEdit2 /></button><button type="button" onClick={() => saveEvents(events.filter((event) => event.id !== item.id))} aria-label={`Delete ${item.title}`}><FiTrash2 /></button></footer></article>)}
          {!selectedEvents.length && <div className="nkos-calendar-empty"><FiCalendar /><p>No events scheduled</p></div>}
        </div>
      </aside>
      {draft && <div className="nkos-calendar-modal"><form onSubmit={submitEvent}><header><div><small>{draft.id ? "EDIT EVENT" : "NEW EVENT"}</small><h3>{draft.id ? draft.title : selectedTitle}</h3></div><button type="button" onClick={() => setDraft(null)} aria-label="Close event editor"><FiX /></button></header><label>Title<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} maxLength={70} autoFocus required /></label><div><label>Date<input type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} required /></label><label>Time<input type="time" value={draft.time} onChange={(event) => setDraft({ ...draft, time: event.target.value })} required /></label></div><label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}><option>Client</option><option>Interview</option><option>Project</option><option>Personal</option></select></label><label>Notes<textarea value={draft.notes} onChange={(event) => setDraft({ ...draft, notes: event.target.value })} maxLength={240} rows={3} /></label><footer><button type="button" onClick={() => setDraft(null)}>Cancel</button><button type="submit">{draft.id ? "Save changes" : "Add event"}</button></footer></form></div>}
    </div>
  );
};

export default CalendarApp;
