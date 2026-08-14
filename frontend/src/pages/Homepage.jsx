import GameCard from '../components/GameCard';
import './Homepage.css';

// Demo data - replace with real API data
const activeGames = [
  {
    id: 2,
    name: 'Project Zomboid',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/108600/header.jpg',
  },
  {
    id: 1,
    name: 'Minecraft',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1672970/header.jpg',
  },
  {
    id: 3,
    name: 'Palworld',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/header.jpg',
  },
];

export default function Homepage() {
  return (
    <div className="homepage">
      <h1 className="homepage-title">
        Meus hosts <span>ativos</span>:
      </h1>

      <div className="homepage-grid">
        {activeGames.map((game) => (
          <GameCard key={game.id} id={game.id} name={game.name} image={game.image} />
        ))}
        <GameCard isAddCard />
      </div>
    </div>
  );
}
