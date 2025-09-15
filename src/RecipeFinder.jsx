import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  const APP_ID = "4ca8a80a";   // 🔑 replace with your real app_id
  const APP_KEY = import.meta.env.VITE_OMDB_API_KEY; // 🔑 replace with your real app_key
  const url = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/api/recipes/v2?type=public&q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const fetchRecipes = async () => {
  if (!search) return;
  try {
    const response = await axios.get(url, {
      params: {
        q: search,
      },
    });
    setRecipes(response.data.hits.map((hit) => hit.recipe));
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
};





  return (
    <div className="app">
      <h1>🍳 Recipe Finder App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchRecipes}>Search</button>
      </div>

      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div className="card" key={index}>
            <img src={recipe.image} alt={recipe.label} />
            <h3>{recipe.label}</h3>
            <p>Calories: {Math.round(recipe.calories)}</p>
            <ul>
              {recipe.ingredientLines.slice(0, 3).map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
            <a href={recipe.url} target="_blank" rel="noreferrer">
              View Full Recipe
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
