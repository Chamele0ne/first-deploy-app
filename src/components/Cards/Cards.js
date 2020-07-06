import React ,{Fragment , useState} from 'react' 
import {Card} from './Card'

export const Cards = (props) => {

	return (

<Fragment>
{props.items ? props.items.map((item,index)=>{
	return <Card item={item} 
	key={index} 
	id={props.currentPage<2  ? index+1 : props.currentPage*10+(index+1)} 
	loading = {props.loading}/>}) : null}


</Fragment>
		)
}


