import { useState } from 'react';
import AddItem from './components/AddItem';
import ItemsList from './components/ItemsList';

const initialItems = JSON.parse(localStorage.getItem('items')) || [];

function App() {
  const [itemsList, setItemsList] = useState(initialItems);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdatingList, setIsUpdatingList] = useState(false);

  const addItemHandler = (name) => {
    if (name.trim().length === 0) return;
    setItemsList((prevItemsList) => [
      ...prevItemsList,
      { id: Math.random().toString(), name: name, completed: false }
    ]);
    setIsUpdatingList(true);
  };

  const updateItemHandler = (id, newName) => {
    setItemsList(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
    setIsUpdatingList(true);
  };

  const deleteItemHandler = (id) => {
    setIsUpdatingList(true);
    setItemsList(prevItems => prevItems.filter(item => item.id !== id));
  };

  const completeItemHandler = (id) => {
    setIsUpdatingList(true);
    setItemsList(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  const saveStorageHandler = () => {
    localStorage.setItem('items', JSON.stringify(itemsList));
  }

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          <div className="shadow-sm p-4 bg-white rounded-2xl">
            <h3 className="text-xl font-bold text-center text-blue-600 mb-4">To Do List</h3>

            {isAdding && <AddItem onAddItem={addItemHandler} />}
            {!isAdding && (
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setIsAdding(true)}>Add new task</button>
            )}
            {itemsList.length > 0 && (
              <ItemsList items={itemsList} onUpdate={updateItemHandler} onDone={completeItemHandler} onDelete={deleteItemHandler} />
            )}

            {isUpdatingList && (
              <button className="bg-gray-500 text-white px-4 py-2 rounded mt-3 hover:bg-gray-600" onClick={saveStorageHandler}>Save List</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;