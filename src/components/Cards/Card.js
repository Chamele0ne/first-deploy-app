import React from 'react'

export const Card = (props) => {
// console.log(props.item)

	return (

<tr >
      <th scope="row">{props.id}</th>
      <td>{props.item.name}</td>
      <td>{props.item.callingCodes[0]}</td>
      <td><img src={props.item.flag}  alt ='...' className="img-thumbnail" style= {{maxWidth : '80px' , maxHeight : '60px'}}/></td>
    </tr>

		)
}