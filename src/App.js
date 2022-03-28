import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MDBTable,MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBtnGroup } from 'mdb-react-ui-kit';
import './App.css';

function App() {

 const [data, setData] = useState([]);
 const [value, setValue] = useState("");
 const [sortValue, setSortValue] = useState("");
//  const [filterValue, setFilterValue] = useState("");
   const sortOptions = ["date", "name"];
  //  const FilterOptions = ['Completed', 'Delivered','Prepared']
  useEffect (() => {
    loadUsersData();
  },[]);

  const loadUsersData = async()=>{
    return await axios
    .get('https://my-json-server.typicode.com/Ved-X/assignment/orders')
    .then((response) => setData(response.data))
    .catch((err) => console.log(err));
  };
  console.log("data", data);
 

  const handleSearch =async(e) =>{
    e.preventDefault();
    return await axios
    .get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?q=${value}`)
    .then((response)=>{
      setData(response.data);
      setValue("");
    })
    .catch((err) => console.log(err));
  }

  const handleSort =async(e) =>{
   let value = e.target.value;
   setSortValue(value);
    return await axios
    .get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?_sort=${value}&_order=asc`)
    .then((response)=>{
      setData(response.data);
   
    })
    .catch((err) => console.log(err))
  }
  const handleFilter =async(value) =>{
    
     return await axios
     .get(`https://my-json-server.typicode.com/Ved-X/assignment/orders?status=${value}`)
     .then((response)=>{
       setData(response.data);
    
     })
     .catch((err) => console.log(err))
   }
  return (
    <div className="App">
     <h1>Hello </h1>
     <MDBContainer>
       <form style={{
         margin:"auto",
         padding:"15px",
         maxWidth:"400px",
         alignContent:"center",
       }}
       className= "d-flex input-group w-auto"
       onSubmit={handleSearch}
       >
         <input
         type="text"
         className='form-control'
         placeholder='Search'
         value={value}
         onChange= {(e) => setValue(e.target.value)}
         />
         <MDBBtn type='submit' color='dark'>Search</MDBBtn>
       </form>
       <div style={{marginTop: "100px"}}>
         <h2 className='text-center'> Search , Filter,Sort</h2>
         <MDBRow>
           <MDBCol size="12">
             <MDBTable>
               <MDBTableHead dark>
               <tr>
                 <th scope='col'>ORDER ID</th>
                 <th scope='col'>CUSTOMER</th>
                 <th scope='col'>ADDRESS</th>
                 <th scope='col'>PRODUCT</th>
                 <th scope='col'>Date Order</th>
                 <th scope='col'>STATUS</th>
               </tr>
               </MDBTableHead>
               {data.length === 0 ? (
                 <MDBTableBody className='align-center mb-0'>
                   <tr>
                     <td colSpan={8} className="text-center mb-0"> No Data Found</td>
                   </tr>
                 </MDBTableBody>
               ):(
                 data.map((item,index) => (
                   <MDBTableBody key={item}>
                     <tr>
                       <th scope='row'>{index+1}</th>
                       {/* <td>{item.order_id}</td> */}
                       <td>{item.customer}</td>
                       <td><h6>{item.country}</h6>{item.address}</td>
                       <td>{item.product_title}<h6>{item.product_description}</h6></td>
                       <td>{item.date}</td>
                       <td>{item.status}</td>
                     </tr>
                   </MDBTableBody>
                 ))
               )}
             </MDBTable>
           </MDBCol>
         </MDBRow>
       </div>
       <MDBRow>
         <MDBCol size="8">
        <h5>Sort By:</h5>
        <select style={{width:"50%", borderRadius:"2px", height:"35px" }}
        onChange={handleSort}
        value={sortValue}
        >
          <option>Please select</option>
          {sortOptions.map((item,index) => (
          <option value={item } key={index}>
            {item}
            </option>
          ))}
          
        </select>
         </MDBCol>
         <MDBCol size="4">
           <h5>Filter</h5>
           <MDBBtnGroup>
             <MDBBtn onClick={()=> handleFilter("Completed")}>Completed</MDBBtn>
             <MDBBtn onClick={()=> handleFilter("Delivered")}>Delivered</MDBBtn>
             <MDBBtn onClick={()=> handleFilter("Prepared")}>Prepared</MDBBtn>
           </MDBBtnGroup>
           {/* <select style={{width:"50%", borderRadius:"2px", height:"35px" }}
        onChange={handleFilter}
        value={filterValue}
        >
          <option>Please select</option>
          {FilterOptions.map((item,index) => (
          <option value={item } key={index}>
            {item}
            </option>
          ))}
          
        </select> */}
           </MDBCol>
       </MDBRow>
     </MDBContainer>
    </div>
  );
}

export default App;
