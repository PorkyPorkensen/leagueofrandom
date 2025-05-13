import React from "react";


// Get N random items from an array
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

export function getRandomItems(items, count = 5) {
  return [...items].sort(() => 0.5 - Math.random()).slice(0, count);
}

export function getRandomItems2(arr, count = 5) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Get items that match at least 1 suggested tag
export function getSuggestedItems(allItems, suggestedTags) {
  return allItems.filter(item =>
    item.tags?.some(tag => suggestedTags.includes(tag))
  );
}

// Get items that match at least 2 suggested tags
export function getBetterSuggestedItems(allItems, suggestedTags) {
  return allItems.filter(item => {
    if (!item.tags) return false;
    const matchCount = item.tags.filter(tag => suggestedTags.includes(tag)).length;
    return matchCount >= 2;
  });
}