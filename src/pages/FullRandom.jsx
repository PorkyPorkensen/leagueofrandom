import React from 'react';
import { getCompletedItems, getRandomItems } from '../services/itemHelpers';
import { fetchRandomChampion } from '../services/fetchData';
import BuildList from '../components/BuildList';
import ChampionCard from '../components/ChampionCard';

const positions = ['Top', 'Jungle', 'Mid', 'Bottom', 'Support'];

export default function FullRandom() {
  const [build, setBuild] = React.useState([]);
  const [champ, setChamp] = React.useState({});
  const [refreshCount, setRefreshCount] = React.useState(0);

  const randIndex = Math.floor(Math.random() * positions.length);
  const position = positions[randIndex];

  React.useEffect(() => {
    async function fetchData() {
      const [champion, itemRes] = await Promise.all([
        fetchRandomChampion(),
        fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/item.json')
          .then(res => res.json()),
      ]);

      const items = getCompletedItems(itemRes.data);
      const randomBuild = getRandomItems(items, 5);

      setChamp(champion);
      setBuild(randomBuild);
    }

    fetchData();
  }, [refreshCount]);

  return (
    <div className="App">
      <h1>You're Playing....</h1>
      <ChampionCard champ={champ} position={position} />
      <button className='refreshBtn' onClick={() => setRefreshCount(prev => prev + 1)}>Refresh</button>
      <h2 className='head'>Building...</h2>
      <BuildList items={build} />
    </div>
  );
}