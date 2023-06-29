export default function ItemRow({ item }) {
  return (
    <div className="item-card">
      <p>{item.name}</p>
      <p>{item.description}</p>
      <p>{item.cost}</p>
    </div>
  );
}
