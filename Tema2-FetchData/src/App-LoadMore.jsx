import { useCallback, useEffect, useMemo, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLoadMore from "./components/HomeLoadMore";
import RecipeDetails from './components/RecipeDetails';

// limit items - load more
const LIMIT = 3;

function AppLoadMore() {
  const [recipes, setRecipes] = useState([]);

  // pagination Items
  const [totalItems, setTotalItems] = useState(0);
  const [existsData, setExistsData] = useState(true);

  // Load More fetchData
  // usecallback pentru a evita rerandarea functiei la fiecare schimbare de stare
  const fetchData = useCallback((searchItem = '', skip = 0,) => {
    let url;

    if (searchItem.trim() === '') {
      url = `https://dummyjson.com/recipes?limit=${LIMIT}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/recipes/search?q=${searchItem}`;
    }

    fetch(`${url}`)
      .then(res => res.json())
      .then(data => {
        setTotalItems(data.total);
        if (data.total > 0) {
          setExistsData(true);
          console.log('data.recipes', data.recipes);

          // push in loc de rerandare
          setRecipes(prev =>
            skip === 0
              ? data.recipes
              : [...prev, ...data.recipes]
          );
        }

        if (data.total === 0) {
          setExistsData(false);
        }
      })
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    fetchData();
  }, []);


  // use memo pentru a evita rerandarea routerului la fiecare schimbare de stare
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <HomeLoadMore recipes={recipes} fetchData={fetchData} existsData={existsData} total={totalItems} />
      },
      {
        path: "/recipes/:id",
        element: <RecipeDetails />,
        loader: async ({ params }) => {
          const res = await fetch(`https://dummyjson.com/recipes/${params.id}`);
          if (!res.ok) throw new Error("Recipe not found");
          return res.json();
        },
      },
    ]);
  }, [recipes, existsData, totalItems]);

  return <RouterProvider router={router} />;
}

export default AppLoadMore
