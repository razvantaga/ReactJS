import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePagination from './components/HomePagination';
import RecipeDetails from './components/RecipeDetails';

// total pages - pagination
const LIMITITMES = 9;

function AppPagination() {
    const [recipes, setRecipes] = useState([]);

    // pagination Items
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [existsData, setExistsData] = useState(true);
    const [sortedMethod, setSortedMethod] = useState('');

    const onSortChange = (newSort) => {
        switch (newSort) {
            case 'name':
                break;
            case 'rating':
                break;
            case 'prepTimeMinutes':
                break;
            case 'cookTimeMinutes':
                break;
            default:
        }

        setSortedMethod(newSort);
        setCurrentPage(1);
    }

    // Pagination fetchData
    const fetchData = async (searchItem = '') => {
        const skip = (currentPage - 1) * LIMITITMES;

        let url;
        if (searchItem.trim() === '') {
            url = `https://dummyjson.com/recipes?limit=${LIMITITMES}&skip=${skip}`;
            if (sortedMethod) {
                url += `&sortBy=${sortedMethod}`;
            }
        } else {
            url = `https://dummyjson.com/recipes/search?q=${searchItem}`;
        }

        try {
            const response = await fetch(`${url}`);
            const data = await response.json();
            setExistsData(true);
            if (data.total === 0) {
                setExistsData(false);
            }
            setRecipes(data.recipes);
            setTotalItems(data.total);
        } catch (error) {
            console.error("Eroare la fetch:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [currentPage, sortedMethod]);
    const totalPages = Math.ceil(totalItems / LIMITITMES);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePagination recipes={recipes} onSortChange={onSortChange} fetchData={fetchData} currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} existsData={existsData} />
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

    return <RouterProvider router={router} />;
}

export default AppPagination
