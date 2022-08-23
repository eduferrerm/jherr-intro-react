import './App.css';
import pokemon from './pokemon.json'
import PropTypes from 'prop-types';
import React from 'react';

const PokemonRow = ({pokemonItem, onSelect}) => (
  <tr>
    <td>{pokemonItem.name.english}</td>
    <td>{pokemonItem.type.join(', ')}</td>
    <td>
      <button onClick={()=>{onSelect(pokemonItem)}}>See Stats</button>
    </td>
  </tr>
);


PokemonRow.propTypes = {
  pokemonItem: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired
    }),
    type: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
  })
}

const PokemonStats = ({name, base}) => (
  <div className="pokemon-details">
    <h2>{name.english}</h2>
    <table>
      {
        Object.keys(base).map(key => (
          <tbody key={key}>
            <tr>
              <td>{key}</td>
              <td>{base[key]}</td>
            </tr>
          </tbody>
        ))
      }
    </table>
  </div>
);

PokemonStats.propTypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "Sp. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  })
}

function App() {
  const [filter, filterSet] = React.useState('');
  const [selectedItem, selectedItemSet] = React.useState(null);
  return (
    <div style={{
      margin: '0 auto',
      maxWidth: 800,
      padding: '1rem'
    }}>
      <h1 className="title">Pokemon Search</h1>
      <input 
        placeholder="Search for pokemon" 
        value={filter}
        onChange={(ev) => filterSet(ev.target.value)}
      />
      <div className="grid">
        <table width="100%">
          <thead>
            <tr style={{
              fontWeight: 'bold'
            }}>
              <td>Name</td>
              <td>Type</td>
              <td>Stats</td>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) => pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
              .slice(0,20)
              .map((pokemonItem)=> (
                <PokemonRow
                  key={pokemonItem.id}
                  pokemonItem={pokemonItem}
                  onSelect={(pokemonItem) => selectedItemSet(pokemonItem)}
                />
            ))}
          </tbody>
        </table>
        {selectedItem &&  (
          <PokemonStats 
            {...selectedItem}
          />
        )}
      </div>
    </div>
  );
}

export default App;
