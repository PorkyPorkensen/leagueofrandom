export async function fetchRandomChampion() {
  const res = await fetch('https://ddragon.leagueoflegends.com/cdn/15.9.1/data/en_US/champion.json');
  const data = await res.json();
  const champs = Object.values(data.data);
  return champs[Math.floor(Math.random() * champs.length)];
}