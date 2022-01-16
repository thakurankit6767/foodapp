// search food Function

async function Search_food(food) {
  try {
    // *************API for multiple for searched name which returns around
    let res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${food}`
    );
    let data = await res.json();
    console.log("data:", data);
    return data;
  } catch (e) {
    console.log("error", e);
  }
}

var timerId;



async function main(food, whatappend, div) {
  
  if (food.length < 3) {
    return false;
  }

  let res = await Search_food(food); //which return data of 10 movies
  console.log("res:", res);

  let foods_data = res.meals;

  // console.log('res.meals_type:', typeof(res.meals))

  // return foods_data;
  append_food(foods_data, whatappend, div);
}

// *********append food

function append_food(food_list, whatappend, div) {
  
  for (let key in food_list) {
    if (food_list[key] === undefined) {
      return false;
    }

   
    let each_div = document.createElement("div");
    each_div.setAttribute("class", "each-div");

    let img = document.createElement("img");
    img.src = food_list[key].strMealThumb;

    let details_div = document.createElement("div");
    details_div.setAttribute("class", "details-div");

    let name = document.createElement("p");
    name.innerText = "Name : " + food_list[key].strCategory;

    let category = document.createElement("p");
    category.innerText = "Category : " + food_list[key].strArea;

    details_div.append(name, category);
    // console.log('details_div:', details_div)

    each_div.append(img, details_div);

    whatappend.append(each_div);

    each_div.onclick = function () {
      whatappend.style.display = "none";

      let instruction = document.createElement("p");
      instruction.innerText = food_list[key].strInstructions;

      details_div.append(instruction);

      div.append(img, details_div);
    };
    // });
  }

  // let whatappend = document.getElementById("[key]");
  // whatappend.innerText = null;
}
//********************** debounce *******************

function debounce(food, whatappend, div) {
  // console.log('div:', div)

  if (timerId) {
    clearTimeout(timerId);
  }

  timerId = setTimeout(() => {
    main(food, whatappend, div);
  }, 1000);
}

// export method

export { debounce };
