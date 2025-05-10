import React from 'react';

export default function FullRandom(){
      const [urmom, setUrmom] = React.useState(0)
      const [ build, setBuild] = React.useState([])
      const [ champ, setChamp ] = React.useState({})
      const itemTags = ['Health', 'SpellBlock', 'Armor', 'CooldownReduction', 'AbilityHaste', 'SpellDamage', 'ManaRegen', 'NonbootsMovement', 'Slow', 'Mana', 'Damage', 'CriticalStrike', 'AttackSpeed', 'ArmorPenetration', 'Tenacity', 'OnHit', 'LifeSteal', 'SpellVamp', 'Aura', 'MagicPenetration', 'Vision', 'HealthRegen']
      const positions = ['Top', 'Jungle', 'Mid', 'Bottom', 'Support']
      const randIndex = Math.floor(Math.random() * 5)
      React.useEffect(() => {
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
    
            const fiveRandomItems = getRandomItems(uniqueItems, 5);
    
    
            setBuild(fiveRandomItems)
            console.log(build)
            console.log(randIndex)
          })
    
          fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json')
            .then(res => res.json())
            .then (data => {
              const champData = data.data
              console.log(champData)
              const champKeys = Object.keys(champData)
              const randomKey = champKeys[Math.floor(Math.random() * champKeys.length)]
              const randomChamp = champData[randomKey]
    
              setChamp(randomChamp)
              console.log(randomChamp)
            })
    
      },[urmom])
    
    
      return (
        <div className="App">
          <h1>You're Playing....</h1>
          <div className='champDiv'>
              <h2 className='head'>{champ.name} {positions[randIndex]}</h2>
              <h3>{champ.title}</h3>
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}  />   
          </div>
          <button className='refreshBtn' onClick={() => setUrmom(urmom + 1)}>Refresh</button>
          <h2 className='head'>Building...</h2>
          <ul className='buildUl'>
            {build.map(item => {
                return (
                  <li key={item.id}>
                      <img src={item.imgUrl} alt={item.name} />
                      <h3>{item.name}</h3>
                  </li>
                )
                
            })}
          </ul>
        </div>
      );
    }
