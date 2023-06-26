export default function SingleItem(props) {
  return (
    <div id="item-card">
      <h3>
        <span>{props.selectedItem.name}</span>
        <span>{props.selectedItem.description}</span>
        <span>{props.selectedItem.cost}</span>
      </h3>
    </div>
  );
}
