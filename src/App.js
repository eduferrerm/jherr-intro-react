import './App.css';
import pokemon from './pokemon.json'
import PropTypes from 'prop-types';

const PokemonRow = ({pokemonItem}) => (
  <tr>
    <td>{pokemonItem.name.english}</td>
    <td>{pokemonItem.type.join(', ')}</td>
  </tr>
)

PokemonRow.propTypes = {
  pokemonItem: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string
    }),
    type: PropTypes.arrayOf(PropTypes.string)
  })
}

function App() {
  return (
    <div style={{
      margin: '0 auto',
      maxWidth: 800,
      padding: '1rem'
    }}>
      <h1 className="title">Pokemon Search</h1>
      <table width="100%">
        <thead>
          <tr style={{
            fontWeight: 'bold'
          }}>
            <td>Name</td>
            <td>Type</td>
          </tr>
        </thead>
        <tbody>
          {pokemon.slice(0,20).map((pokemonItem)=> (
            <PokemonRow
              key={pokemonItem.id}
              pokemonItem={pokemonItem}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
