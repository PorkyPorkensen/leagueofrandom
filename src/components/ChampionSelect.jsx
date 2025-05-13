import React from 'react';

export default function ChampionSelect({ champList, selectedChamp, setSelectedChamp, displayNameFix }) {
  return (
    <div>
      <label htmlFor="champSelect">Champion:</label>
      <select
        id="champSelect"
        value={selectedChamp}
        onChange={(e) => setSelectedChamp(e.target.value)}
      >
        {champList.map((champ) => (
          <option key={champ} value={champ}>
            {displayNameFix[champ] || champ}
          </option>
        ))}
      </select>
    </div>
  );
}