import React from 'react'
import ShopItem from './ShopItem'

export default function ItemDetails(props) {
    let obj = props.obj
    console.log(props.obj)
    return <ShopItem obj={obj} />;
}
