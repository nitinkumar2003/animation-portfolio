import React, { useState } from "react";
import { FiArrowUpRight, FiMapPin, FiNavigation, FiSearch } from "react-icons/fi";

const homeLocation = "Noida, Uttar Pradesh, India";

const MapsApp = () => {
  const [query, setQuery] = useState(homeLocation);
  const [destination, setDestination] = useState(homeLocation);
  const submit = (event) => { event.preventDefault(); if (query.trim()) setDestination(query.trim().slice(0, 120)); };
  const encoded = encodeURIComponent(destination);

  return <div className="nkos-maps-app"><header><form onSubmit={submit}><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} maxLength={120} aria-label="Map location" /><button type="submit">Find</button></form><button type="button" onClick={() => { setQuery(homeLocation); setDestination(homeLocation); }}><FiMapPin /> Nitin's location</button></header><div className="nkos-maps-canvas"><iframe key={destination} title={`Map of ${destination}`} loading="lazy" src={`https://www.google.com/maps?q=${encoded}&output=embed`} referrerPolicy="no-referrer-when-downgrade" /></div><footer><div><span><FiMapPin /></span><p><small>PROFESSIONAL BASE</small><b>{homeLocation}</b><em>Available for remote work worldwide</em></p></div><nav><a href={`https://www.google.com/maps/search/?api=1&query=${encoded}`} target="_blank" rel="noreferrer"><FiArrowUpRight /> Open map</a><a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(homeLocation)}`} target="_blank" rel="noreferrer"><FiNavigation /> Directions</a></nav></footer></div>;
};

export default MapsApp;
