import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [meal, Setmeal] = useState([]);

  const getRandomDataAsyncAwait = async (e) => {
    try{
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', {
        method: 'GET'
        });

      if(response.status !== 200){
        throw Error('Something went wrong ' + response.status);
      }
        
    const data = await response.json();
    console.log(data);
    Setmeal(data.meals[0] || []);

    } catch(e){
      console.log('ERROR: ', e);
    }
}

const renderIngredients = (params) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;

    if (params[ingredientKey]) {
      ingredients.push(
        <li key={i}>
          {params[ingredientKey]}: {params[measureKey]}
        </li>
      );
    }
  }

  return <ul className='ing'>{ingredients}</ul>;
};

const render = ({ strMealThumb, strMeal, strInstructions, ...restOfParams }) => {
  return (
    <div className="meal__header">
      <div className="meal__thumbnail">
        <img src={strMealThumb} alt="" />
      </div>
      <h2>{strMeal}</h2>
      {<ul>{renderIngredients(restOfParams)}</ul>}
      <p>{strInstructions}</p>
    </div>
  );
};

  return (
    <div className="App">
      <button className='meal-btn' onClick={getRandomDataAsyncAwait}>Get Random Meal</button>
      {render(meal || null)}
    </div>
  );
}

export default App;
