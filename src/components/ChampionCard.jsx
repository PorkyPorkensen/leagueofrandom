export default function ChampionCard({ champ, position }) {
  if (!champ?.id) return null;

  return (
    <div className='champDiv'>
      <h2 className='head'>{champ.name} {position}</h2>
      <h3>{champ.title}</h3>
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`} alt={champ.name} />
    </div>
  );
}