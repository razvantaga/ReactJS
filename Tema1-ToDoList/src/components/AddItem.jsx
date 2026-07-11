import { useState } from "react";

export default function AddItem(props) {
    const [name, setName] = useState('');

    const addItemHandler = (event) => {
        event.preventDefault();
        props.onAddItem(name);
        setName('');
    }

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    }

    return (
        <div className="mb-3">
            <form onSubmit={addItemHandler}>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        id="name"
                        className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={name}
                        onChange={nameChangeHandler}
                        placeholder="Add new tasks..."
                    />
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
