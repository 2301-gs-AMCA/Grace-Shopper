export default function ItemCard(props){
    
    
    return(<div className="item-card">
        <p>{props.item.name}</p>
        <p>{props.item.description}</p>
        <p>${props.item.cost}</p>

        
    </div>)
}