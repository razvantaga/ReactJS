import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function Item({ item, onUpdate, onDone, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(item.name);

    const saveHandler = () => {
        if (!value.trim()) return;

        onUpdate(item.id, value);
        setIsEditing(false);
    };

    return (
        <li className={`flex items-center justify-between p-3 bg-white ${item.completed ? 'line-through text-gray-500 opacity-50' : ''}`}>

            {isEditing ? (
                <div className="flex items-center gap-2 w-full">
                    <input type="text" className="flex-1 border rounded px-2 py-1" value={value} onChange={(e) => setValue(e.target.value)} autoFocus />
                    <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={saveHandler}>Save</button>
                    <button className="bg-gray-500 text-white px-3 py-1 rounded"
                        onClick={() => {
                            setValue(item.name);
                            setIsEditing(false);
                        }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between w-full rounded">
                    <span className="text-base">{item.name}</span>
                    <span className={`inline-block rounded-full px-3 py-1 ${item.completed ? 'bg-green-500 text-white' : 'bg-yellow-400 text-black'}`}>{item.completed ? "Done" : "In progress"}</span>
                    <div className="flex items-center gap-2">
                        <button className="border border-blue-500 text-blue-500 rounded px-2 py-1 text-sm" onClick={() => setIsEditing(true)}><FaEdit title="Edit" /></button>
                        <button className="border border-green-500 text-green-500 rounded px-2 py-1 text-sm" onClick={() => onDone(item.id)}><FaCheck title="Complete" /></button>
                        <button className="border border-red-500 text-red-500 rounded px-2 py-1 text-sm" onClick={() => onDelete(item.id)}><FaTrash title="Delete" /></button>
                    </div>
                </div>
            )}
        </li>
    );
}

