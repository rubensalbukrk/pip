type ItemProps = | "item1" | "item2" | "item3"

function randomItem(item: ItemProps){

    const Items = {
    item1: "amarela",
    item2: "roxa",
    item3: "verde"
}
    return Items[item] ?? 'password not found'
}

