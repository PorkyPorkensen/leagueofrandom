export async function fetchChampData() {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json');
  const data = await res.json();
  return {
    champList: Object.keys(data.data),
    allChampData: data.data,
  };
}

export async function fetchItemData() {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/item.json');
  const data = await res.json();

  const completedItemData = Object.entries(data.data)
    .filter(([id, item]) => item.gold.total > 1801 && item.gold.purchasable && item.maps["11"])
    .map(([id, item]) => ({
      id,
      name: item.name,
      totalGold: item.gold.total,
      imgUrl: `https://ddragon.leagueoflegends.com/cdn/15.9.1/img/item/${id}.png`,
      ...item
    }));

  const nameMap = new Map();
  for (const item of completedItemData) {
    if (!nameMap.has(item.name)) {
      nameMap.set(item.name, item);
    }
  }

  return Array.from(nameMap.values());
}

export function getCompletedItems(data) {
  return Object.entries(data)
    .filter(([_, item]) =>
      item.gold.total > 1801 &&
      item.gold.purchasable &&
      item.maps["11"]
    )
    .map(([id, item]) => ({
      id,
      name: item.name,
      totalGold: item.gold.total,
      imgUrl: `https://ddragon.leagueoflegends.com/cdn/15.9.1/img/item/${id}.png`,
      ...item,
    }));
}

export async function fetchRandomChampion() {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json');
  const data = await res.json();
  const champs = Object.values(data.data);
  return champs[Math.floor(Math.random() * champs.length)];
}