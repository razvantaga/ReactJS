import { useState } from "react";

export default function SortItems({ onSortChange }) {


    return (
        <div className="w-full max-w-xs">
            <label htmlFor="options" className="text-md font-medium text-white"> </label>
            <select id="options" name="options" className="block w-full px-3 py-2 mt-1  bg-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none text-sm text-white" onChange={(e) => onSortChange(e.target.value)}>
                <option value="0" defaultValue>Sort Items</option>
                <option value="name" >Sort Alphabetic</option>
                <option value="rating" >Sort by rating</option>
                <option value="cookTimeMinutes" >Sort by cooking time</option>
                <option value="prepTimeMinutes" >Sort by prepareting time</option>
            </select>
        </div>
    )
}