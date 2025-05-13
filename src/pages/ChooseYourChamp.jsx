
import React from 'react';
import ChampionSelect from '../components/ChampionSelect';
import ChampionDisplay from '../components/ChampionDisplay';
import BuildButtons from '../components/BuildButtons';
import BuildList from '../components/BuildList';
import { fetchChampData, fetchItemData } from '../services/fetchData';
import {
  getRandomItems,
  getSuggestedItems,
  getBetterSuggestedItems,
} from '../services/itemHelpers';

export default function ChooseYourChamp() {
  const [champList, setChampList] = React.useState([]);
  const [build, setBuild] = React.useState([]);
  const [selectedChamp, setSelectedChamp] = React.useState('Aatrox');
  const [allChampData, setAllChampData] = React.useState({});
  const [isHidden, setisHidden] = React.useState(true);
  const [allItems, setAllItems] = React.useState([]);
  const [dummyState, setDummyState] = React.useState(0);

  const roleToItemTags = {
    Marksman: ['Damage', 'AttackSpeed', 'CriticalStrike', 'LifeSteal'],
    Assassin: ['Damage', 'CooldownReduction', 'ArmorPenetration', 'MagicPenetration'],
    Tank: ['Health', 'Armor', 'SpellBlock', 'HealthRegen', 'Tenacity', 'Slow'],
    Mage: ['SpellDamage', 'Mana', 'ManaRegen', 'CooldownReduction', 'Slow', 'MagicPenetration'],
    Support: ['Aura', 'Vision', 'HealthRegen', 'ManaRegen', 'Health', 'Slow'],
    Fighter: ['Damage', 'Health', 'OnHit', 'Tenacity', 'AttackSpeed', 'LifeSteal'],
  };

React.useEffect(() => {
  async function loadData() {
    const { champList, allChampData } = await fetchChampData();
    setChampList(champList);
    setAllChampData(allChampData);

    const items = await fetchItemData();
    setAllItems(items);
    setBuild(getRandomItems(items, 5));
  }

  loadData()
  setisHidden(true);
}, [selectedChamp, dummyState]);
  

const displayNameFix = {
    MonkeyKing: "Wukong",
  };

  const selectedChampData = allChampData[selectedChamp];
  const champTags = selectedChampData?.tags || [];
  const suggestedItemTags = Array.from(new Set(
    champTags.flatMap(tag => roleToItemTags[tag] || [])
  ));

  function getRandomSuggestedItems() {
    const filtered = getSuggestedItems(allItems, suggestedItemTags);
    const shuffled = getRandomItems(filtered, 5);
    setBuild(shuffled);
    setisHidden(false);
  }

  function getBetterItems() {
    const filtered = getBetterSuggestedItems(allItems, suggestedItemTags);
    const shuffled = getRandomItems(filtered, 5);
    setBuild(shuffled);
    setisHidden(false);
  }

  return (
    <div>
      <ChampionSelect
        champList={champList}
        selectedChamp={selectedChamp}
        setSelectedChamp={setSelectedChamp}
        displayNameFix={displayNameFix}
      />
      <ChampionDisplay
        selectedChamp={selectedChamp}
        selectedChampData={selectedChampData}
        displayNameFix={displayNameFix}
      />
      <button
        className="refreshBtn2"
        onClick={() => {
          setSelectedChamp('Aatrox');
          setisHidden(true);
        }}
      >
        Refresh
      </button>
      <h2 className="head">{isHidden ? 'Choose your build style' : 'Building...'}</h2>
      <BuildButtons
        onSoftClick={getBetterItems}
        onMildClick={getRandomSuggestedItems}
        onRandomClick={() => {
          setisHidden(false);
          setDummyState(dummyState + 1);
        }}
      />
      {!isHidden && <BuildList items={build} />}
    </div>
  );
}