import React from 'react';

export default function ChooseYourChamp(){
    const itemTags = ['Health', 'SpellBlock', 'Armor', 'CooldownReduction', 'AbilityHaste', 'SpellDamage', 'ManaRegen', 'NonbootsMovement', 'Slow', 'Mana', 'Damage', 'CriticalStrike', 'AttackSpeed', 'ArmorPenetration', 'Tenacity', 'OnHit', 'LifeSteal', 'SpellVamp', 'Aura', 'MagicPenetration', 'Vision', 'HealthRegen']
    const [champList, setChampList] = React.useState([])
    const [build, setBuild] = React.useState([])
    const [selectedChamp, setSelectedChamp] = React.useState('Aatrox')
    const [allChampData, setAllChampData] = React.useState({})
    const [isHidden, setisHidden] = React.useState(true)
    const [metaBuild, setMetaBuild] = React.useState([])
    const [allItems, setAllItems] = React.useState([])
    const [dummyState, setDummyState] = React.useState(0)
    

    const roleToItemTags = {
    Marksman: ['Damage', 'AttackSpeed', 'CriticalStrike', 'LifeSteal'],
    Assassin: ['Damage', 'CooldownReduction', 'ArmorPenetration', 'MagicPenetration'],
    Tank: ['Health', 'Armor', 'SpellBlock', 'HealthRegen', 'Tenacity', 'Slow'],
    Mage: ['SpellDamage', 'Mana', 'ManaRegen', 'CooldownReduction', 'Slow', 'MagicPenetration'],
    Support: ['Aura', 'Vision', 'HealthRegen', 'ManaRegen', 'Health', 'Slow'],
    Fighter: ['Damage', 'Health', 'OnHit', 'Tenacity', 'AttackSpeed', 'LifeSteal'],
};

    React.useEffect(() => {
        fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json')
        .then ( res => res.json())
        .then ( data => {
            const champData = data.data
            const champKeys = Object.keys(champData)
            setChampList(champKeys)
            setAllChampData(data.data)
            
        })

        fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/item.json')
          .then(res => res.json())
          .then(data => {
            const itemData = data.data
    
            let completedItemData = Object.entries(itemData)
            .filter(([id, item]) => item.gold.total > 1801 && item.gold.purchasable === true && item.maps["11"] === true )
            .map(([id, item]) => ({ id, name: item.name, totalGold: item.gold.total, imgUrl: `https://ddragon.leagueoflegends.com/cdn/15.9.1/img/item/${id}.png`, ...item }));
    
    
            function getRandomItems(arr, count = 5) {
              const shuffled = [...arr].sort(() => 0.5 - Math.random());
              return shuffled.slice(0, count);
            }
            
            const nameMap = new Map();
            for (const item of completedItemData) {
              if (!nameMap.has(item.name)) {
                nameMap.set(item.name, item);
              }
            }
    
            const uniqueItems = Array.from(nameMap.values());
            setAllItems(uniqueItems)
            const fiveRandomItems = getRandomItems(uniqueItems, 5);
    
            console.log(fiveRandomItems)
            setBuild(fiveRandomItems)
            console.log(build)

          })
    }, [selectedChamp, dummyState])
            
    const displayNameFix = {
                MonkeyKing: "Wukong",
            }

    const selectedChampData = allChampData[selectedChamp]
    const champTags = selectedChampData?.tags || [];
    const suggestedItemTags = Array.from(new Set(
     champTags.flatMap(tag => roleToItemTags[tag] || [])
    ));
    console.log(suggestedItemTags)

    function getRandomSuggestedItems() {
  const filtered = allItems.filter(item =>
    item.tags?.some(tag => suggestedItemTags.includes(tag))
  );
  console.log(filtered)
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  setBuild(shuffled.slice(0, 5));
  setisHidden(false);
}

    return (
        <div>
                <label htmlFor="champSelect">Champion:</label>
                    <select id="champSelect" 
                        value={selectedChamp} 
                        onChange={e => setSelectedChamp(e.target.value)}>
                        {champList.map((champ) => {
                            return(
                                <option key={champ} value={`${champ}`}>  {displayNameFix[champ] || champ}
                                </option>
                            )
                        })}
                    </select>
                    <h1 className='head'>{displayNameFix[selectedChamp] || selectedChamp}</h1>
                    <h2>{selectedChampData ? selectedChampData.title : ""}</h2>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${selectedChamp}_0.jpg`}  />
                    <button className='refreshBtn2' onClick={() => {setSelectedChamp('Aatrox')
                        setisHidden(true)
                    }}>Refresh</button>
                    <h2 className='head'>Building...</h2>
            <div className='btnDiv'>
                <button className='buildBtn mild' onClick={getRandomSuggestedItems}>Mild 🥸</button>
                <button className='buildBtn red' onClick={() => {setisHidden(false)
                    setDummyState(dummyState + 1)}
                }>Fully Random 🗿</button>
            </div> 
    
    
    
     {isHidden ? "" : <ul className='buildUl'>
            {build.map(item => {
                return (
                  <li key={item.id}>
                      <img src={item.imgUrl} alt={item.name} />
                      <h3>{item.name}</h3>
                  </li>
                )
                
            })}
          </ul>}
        </div>
    )
}