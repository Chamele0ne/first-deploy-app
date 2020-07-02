import React,{useEffect ,useState , Fragment } from 'react';
import axios from 'axios'
import {Cards} from './components/Cards/Cards'
import {Pagination} from './components/Pagination'
import {Loader} from './Loader'

function App() {
//States of project
	const [state , setState] = useState([])
	const [value , setValue] = useState('')
	const [checked , setChecked] = useState(false)
	const [loading , setLoading ] = useState(false)
 //States for paginations
  const [currentPage , setCurrentPage] = useState(1)
  const [cardsPerPage] = useState(10)

	const search = async () => {

		// const api_key='AIzaSyCfY1OMUS_abTqJ6-swN-QYDqrxrlTAfHA';
// const response = await 
// axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=HZk31lZYmME&t=1s&key=AIzaSyCfY1OMUS_abTqJ6-swN-QYDqrxrlTAfHA")
setLoading(true)
const response = await axios.get('https://restcountries.eu/rest/v2/all')

setState(response.data)
setLoading(false)

}

useEffect(()=>{
	search()

},[])


const onChangeInput  = (event) => {
	console.log(value)
	setValue(event.target.value)


}

function SubmitHandler(event) {
	event.preventDefault()
	if(value !== null){
		setState(()=>state.filter(item => (item.name.toLowerCase().includes(value.toLowerCase())
			)
		)
		)
	
	}
	if ( value ===null || value ===''){
		search()
	}
setValue('')
}


function onChangeCheck(value) {
	setChecked(!checked)
	if (!checked){
		setState(()=>state.filter(item => item.region===value))
	}
	console.log(value)
	if(checked){
		search()
	}
}

//get current cards
const indexOfLastPost = currentPage*cardsPerPage
const indexOfFirstPost = indexOfLastPost - cardsPerPage 
const currentCards = state.slice(indexOfFirstPost , indexOfLastPost );


function paginate (pageNumber){
	setCurrentPage(pageNumber)
}




    return (
<Fragment>
<div className = 'container  text-center'>
			<form    
				style={{ marginBottom : '1rem' }}
				onSubmit = {SubmitHandler}	>
					<input type="text" 
						className="form-control mx-auto mt-4" 
						placeholder="Search" 
						aria-label="Search" 
						style={{maxWidth : '50%'}}
						value={value}
					onChange = {(event)=>onChangeInput(event)}
					/>
			</form>


		<div className='text-center'>
      <input 
     
      	type="checkbox"
      	aria-label="Checkbox for following text input"
      	className='p-4 m-4'
   			onChange={()=>onChangeCheck('Asia')}	/>Asia
	

      <input 
   
      	type="checkbox"
      	aria-label="Checkbox for following text input"
      	className='p-4 m-4'
   			onChange={()=>onChangeCheck('Europe')}	/>Europe

      <input 
 
      	type="checkbox"
      	aria-label="Checkbox for following text input"
      	className='p-4 m-4'
   			onChange={()=>onChangeCheck('Africa')}	/>Africa

</div>

{loading && <Loader /> }
    <div className="col-sm text-center p-3 mb-2 pt-3  text-white ">    
   		<table  className='table'>
    		<thead className="thead-light">
    			<tr>
      			<th scope="col">#</th>
      			<th scope="col">Country </th>
      			<th scope="col">Tel.Code</th>
      			<th scope="col">Flag</th>
    			</tr>
  			</thead>  
  			<tbody>
					{<Cards items={currentCards} className='col-sm' loading = {loading} currentPage = {currentPage}/> }

  			</tbody> 
   		</table>
   		<Pagination totalCards = {state.length} 
   		cardsPerPage = {cardsPerPage}
   		paginate = {paginate}/> 
    </div>
</div>
    </Fragment>
  );
}

export default App;









