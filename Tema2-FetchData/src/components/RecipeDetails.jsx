import { useLoaderData } from "react-router-dom";

export default function RecipeDetails() {
    const recipe = useLoaderData();

    return (
        <div className="min-h-screen bg-gray-950 py-30 px-6">
            <article className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-gray-800 bg-gray-900 shadow-2xl">

                <div className="grid lg:grid-cols-3">
                    <div className="p-8">
                        <img src={recipe.image} alt={recipe.name} className="h-96 w-full rounded-2xl object-cover" />

                        <div className="mt-6 flex items-center justify-between">
                            <h1 className="text-4xl font-bold text-white"> {recipe.name} </h1>

                            <div className="flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-2">
                                <svg className="text-amber-300 h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span className="font-bold text-amber-300"> {recipe.rating} </span>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="rounded-xl bg-gray-800 p-5 text-center">
                                <p className="text-xs uppercase tracking-wider text-gray-400"> Prep </p>
                                <p className="pt-2 text-2xl font-bold text-white"> {recipe.prepTimeMinutes} min </p>
                            </div>

                            <div className="rounded-xl bg-gray-800 p-5 text-center">
                                <p className="text-xs uppercase tracking-wider text-gray-400"> Cook </p>
                                <p className="pt-2 text-2xl font-bold text-white"> {recipe.cookTimeMinutes} min </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 p-8">
                        <div className="rounded-2xl bg-gray-800 p-6">
                            <h2 className="mb-5 text-2xl font-bold text-white"> Ingredients </h2>
                            <ul className="space-y-4">
                                {recipe.ingredients.map((ingredient) => (
                                    <li key={ingredient} className="flex items-center gap-3 text-gray-300" >
                                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                                        {ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8 p-8">
                        <div className="rounded-2xl bg-gray-800 p-6">
                            <h2 className="mb-5 text-2xl font-bold text-white"> Instructions </h2>
                            <ol className="space-y-5">
                                {recipe.instructions.map((step, index) => (
                                    <li key={step} className="flex gap-4">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-400 font-bold text-gray-900"> {index + 1} </div>
                                        <p className="text-gray-300 leading-7"> {step} </p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </article>
        </div>

    );
}
