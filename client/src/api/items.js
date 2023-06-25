export async function fetchItem(itemId){
    try{
const response = await fetch(`/api/items/${itemId}`);
const {item} = await response.json();
return item;
    }catch(error){
        console.error(error)
    }
}

