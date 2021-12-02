import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods); // use state keeps track of [food] init to (spicyFoods) and updates with {setFoods()}

  const [filterBy,  setFilterBy] = useState("All"); // use state keeps track of [filterBy] init to "All" and updates with {setFilterBy()}

  console.log("foods: (below)");
  console.log(foods);
  console.log('filterBy: ' + filterBy);

  const foodsToDisplay = foods.filter( // filter: for each item of foods (food) remove any item that returns false
    food => {
      if (filterBy === "All") {
        return true;
      }
      else {
        return food.cuisine === filterBy;
      }
    }
  );

  console.log("foodsToDisplay: (below)");
  console.log(foodsToDisplay);

  let foodList = foodsToDisplay.map((food) => ( // .map take each item of foodsToDisplay (food) and perform some action into new array
    <li key={food.id} onClick={() => removeFood(food.id)}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
    </li>
  )); // JSX list item with the key prop, onClick event, and content food info from foodsToDisplay mapped 
      // within onClick, we need an arrow function else we immediate call remove food?


  // console.log(foodList);

  function removeFood(id) {
    setFoods(foods.filter(food => (food.id !== id))); // removeFood is the onclick for each li to delete when clicked
  };

  function handleAddFood() {    // this function adds newFood from getNewSpicyFood from another component to our foods list
    // const newFood = getNewSpicyFood();  // note: foods is not filtered, it gets filtered on state update of filterBy
    // console.log(newFood);
    setFoods([...foods, getNewSpicyFood()]);  // note how setFoods is the update function and just needs an update fx passed into it
    // foods.push(newFood);
  };

  return (  // finally the return of our our JSX component...
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <select name="filter" onChange={e => setFilterBy(e.target.value)}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
      <ul>{foodList}</ul>
    </div>
  );  // within the div, we  have the new food button, the filter select, and finally the unordered list with our {foodList} li's
};

export default SpicyFoodList; // export default our only component 
