import React from 'react';

export default function ChampionDisplay({ selectedChamp, selectedChampData, displayNameFix }) {
  return (
    <div>
      <h1 className="head">{displayNameFix[selectedChamp] || selectedChamp}</h1>
      <h3>{selectedChampData?.title || ''}</h3>
      <img
        className='champPic'
        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChamp}_0.jpg`}
        alt={selectedChamp}
      />
    </div>
  );
}