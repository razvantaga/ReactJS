import PaginationBtns from "./PaginationBtns";
import RecipeItem from "./RecipeItem";
import SearchItem from "./SeartchItem";
import SortItems from "./SortItems";

export default function HomePagination(props) {
    return (
        <div className="bg-gray-900 py-20 min-h-screen">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <div className="mx-auto max-w-2xl ">
                    <h2 className="text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">Menu</h2>
                    <p className="mt-2 text-lg/8 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, praesentium!</p>
                </div>

                <div className="mx-auto mt-10 py-10 border-t border-gray-700 flex justify-between items-center flex-col lg:flex-row gap-4">
                    <SortItems onSortChange={props.onSortChange} />
                    <SearchItem fetchData={props.fetchData} />
                </div>

                {props.existsData
                    ? <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-700 pt-10  sm:pt-16 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3 text-center">
                        {props.recipes.map(item => <RecipeItem key={item.id} data={item} />)}
                    </div>
                    :
                    <p className="text-lg/8 text-gray-300 text-center">No data found!</p>
                }

                {props.existsData && <PaginationBtns setCurrentPage={props.setCurrentPage} currentPage={props.currentPage} totalPages={props.totalPages} />}
            </div>
        </div>
    );
}