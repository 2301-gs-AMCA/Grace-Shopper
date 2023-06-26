import ItemRow from "./ItemRow";

export default function Items({ items, selectItem }) {
  return (
    <div>
      <div className="items-container">
        {items.map((item) => {
          return <ItemRow key={item.id} item={item} selectItem={selectItem} />;
        })}
      </div>
    </div>
  );
}
