export async function fetchItem(itemId){
    try{
const response = await fetch(`/api/items/${itemId}`);
const {item} = await response.json();
return item;
    }catch(error){
        console.error(error)
    }
}

export async function fetchAllItems(){
try {
    const response = await fetch('/api/items');
    const items = await response.json();

    return items;
} catch (err) {
    console.error(err)
}
}