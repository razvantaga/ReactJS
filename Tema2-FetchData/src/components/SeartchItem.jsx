import { useState } from "react";

export default function SearchItem({ fetchData }) {
    const [searchValue, setSearchValue] = useState();
    const searchHandle = () => {
        fetchData(searchValue);
    }

    return (
        <form className="max-w-md w-full">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                </div>
                <input type="search" id="search" className="block w-full rounded-2xl bg-gray-700 text-white text-sm placeholder:text-gray-400 pl-10 pr-24 py-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder="Search" required onChange={(e) => setSearchValue(e.target.value)} />
                <button type="button" className="absolute right-1.5 bottom-1.5 text-white bg-gray-800 hover:bg-gray-900 border border-transparent shadow-sm font-medium leading-5 rounded-2xl text-xs px-3 py-1.5 focus:outline-none"
                    onClick={searchHandle}>
                    Search
                </button>
            </div>
        </form>
    );
}