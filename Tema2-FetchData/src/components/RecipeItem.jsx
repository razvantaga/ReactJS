import { memo } from "react";
import { Link } from "react-router-dom";

function RecipeItem(props) {
    return (
        <article className="max-w-sm overflow-hidden rounded-2xl bg-gray-900 shadow-lg border border-gray-800 flex flex-col group">
            <div className="relative overflow-hidden h-52 w-full">
                <img src={props.data.image} alt="Recipe Name" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-gray-900/80 px-2.5 py-1 text-sm font-semibold text-amber-400 backdrop-blur-sm">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{props.data.rating}</span>
                </div>
            </div>

            <div className="flex flex-col grow p-5">
                <h3 className="text-xl font-bold text-white transition-colors group-hover:text-amber-400">{props.data.name}</h3>

                <div className="mt-3 flex items-center gap-4 text-xs font-medium text-gray-400 border-b border-gray-800 pb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 uppercase tracking-wider">Prep:</span>
                        <span className="text-gray-200">{props.data.prepTimeMinutes} min</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-gray-500 uppercase tracking-wider">Cook:</span>
                        <span className="text-gray-200">{props.data.cookTimeMinutes} min</span>
                    </div>
                </div>

                <div className="mt-4 grow">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Key Ingredients</h4>
                    <ul className="mt-2 space-y-1 text-sm text-gray-300">
                        {props.data.ingredients.map(ingredient =>
                            <li key={ingredient} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0"></span>
                                {ingredient}
                            </li>
                        )}
                    </ul>
                </div>

                <Link to={`/recipes/${props.data.id}`} className="mt-6 w-full rounded-xl bg-amber-500 py-3 text-center text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                    See more
                </Link>
            </div>
        </article>
    );
}

// memo pentru a evita rerandarea componentelor la fiecare schimbare de stare
export default memo(RecipeItem);