import Item from "./Item";

export default function ItemsList({ items, onUpdate, onDone, onDelete }) {
    return (
        <ul className="divide-y divide-gray-200 rounded-lg border mt-3 bg-white">
            {items.map(item => (
                <Item
                    key={item.id}
                    item={item}
                    onUpdate={onUpdate}
                    onDone={onDone}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}