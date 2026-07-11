import { useState } from "react";
import SearchItem from "./SeartchItem";
import RecipeItem from "./RecipeItem";
// import SortItems from "./SortItems";

export default function HomeLoadMore(props) {
    const [skip, setSkip] = useState(0);
    console.log(props);

    const loadMoreHandle = () => {
        const newSkip = skip + 3;
        setSkip(newSkip);
        props.fetchData('', newSkip);
    };

    return (
        <div className="bg-gray-900 py-20 min-h-screen ">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-2xl ">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Menu</h2>
                    <p className="mt-2 text-lg/8 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, beatae?</p>
                </div>

                <div className="mx-auto mt-10 py-10 border-t border-gray-700 flex justify-center items-center">
                    <SearchItem fetchData={props.fetchData} />
                </div>

                {props.existsData
                    ? <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10  sm:pt-16 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3 text-center">
                        {props.recipes.map(item => <RecipeItem key={item.id} data={item} />)}
                    </div>
                    :
                    <p className="text-lg/8 text-gray-300 text-center">No data found!</p>
                }

                {props.existsData && <button className={`max-w-sm  mt-6 w-full rounded-xl bg-sky-500/50 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-500/75 focus:outline-none ${props.recipes.length === props.total ? 'hidden' : ''} `}
                    onClick={loadMoreHandle}>
                    Load More
                </button>}
            </div>
        </div>
    );
}