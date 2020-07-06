import React,{useEffect ,useState , Fragment } from 'react';
import axios from 'axios'
import {Cards} from './components/Cards/Cards'
import {Pagination} from './components/Pagination'
import {Loader} from './Loader'
import {Select} from './components/Cards/Select'

function App() {
//States of project
const [state , setState] = useState([])
const [value , setValue] = useState('')
const [loading , setLoading ] = useState(false)
const [regions , setRegions] = useState([])
const [result , setResult ] = useState([])


	const [currentPage , setCurrentPage] = useState(1)
	const [cardsPerPage] = useState(10)



 const search = async () => {

		// const api_key='AIzaSyCfY1OMUS_abTqJ6-swN-QYDqrxrlTAfHA';
// const response = await 
// axios.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=HZk31lZYmME&t=1s&key=AIzaSyCfY1OMUS_abTqJ6-swN-QYDqrxrlTAfHA")
setLoading(true)
const response = await axios.get('https://restcountries.eu/rest/v2/all')
let set = new Set()
response.data.map(item=>set.add(item.region))
setRegions(set)
setState(response.data)
setLoading(false)

}


useEffect(()=>{
	search()
},[])

const onChangeInput  = (event) => {
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


const onChangeSelect =  (event  ) => {

		if (event.target.value !==null ){
		setResult(state.filter(item => item.region===event.target.value))
	}

}

	function paginate (pageNumber){
		setCurrentPage(pageNumber)
	}

	let currentCards;
	let totalCards;
	const indexOfLastPost = currentPage*cardsPerPage
	const indexOfFirstPost = indexOfLastPost - cardsPerPage 

	if(result.length===0){
		currentCards = state.slice(indexOfFirstPost , indexOfLastPost );
		totalCards = state.length
	}else {
		currentCards = result.slice(indexOfFirstPost , indexOfLastPost );
		totalCards = result.length
	}

return (
<Fragment>
<div className = 'container  text-center'>
			<form    
				style={{ marginBottom : '1rem '  }}
				className = 'row'
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


<span style = {{justifyContent : "space-between" }} className = 'p-2'>
<i  className="fas fa-globe"></i></span>
		<Select regions={Array.from(regions)}  onChangeSelect={onChangeSelect}/>


			<div className='text-center'>
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

 {<Cards items={currentCards} className='col-sm' loading = {loading} currentPage={currentPage} /> }
				
 			</tbody>
   		</table>
   			<Pagination totalCards={totalCards} cardsPerPage={cardsPerPage} paginate={paginate}/>
    </div>
</div>
    </Fragment>
  );
}

export default App;






