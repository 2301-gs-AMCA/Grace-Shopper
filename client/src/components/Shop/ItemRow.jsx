export default function ItemRow({ item, selectItem }) {
  return (
    <div className="item-card" onClick={() => selectItem(item.id)}>
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.cost}</p>
    </div>
  );
}
