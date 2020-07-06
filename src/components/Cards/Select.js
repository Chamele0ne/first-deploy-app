import React from 'react'
export const Select = (props) => {

	return (

<select className="custom-select"  
style = {{width : '30%'}}
id="inputGroupSelect01"  
onChange={(event)=>props.onChangeSelect(event)}>
    <option >Choose...</option>
    {props.regions.map((item , index) => item !=='' ? <option value={item} key = {index}>{item}</option> : null )}
    
  </select>

		)
}