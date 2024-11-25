import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Module from './Module';


function Home() {
    let [title, setTitle] = useState([])
    let [showAddMod,setAddMod] = useState(false)
    let [showEditMod,setEditMod] = useState(false)
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(()=>{

        sessionStorage.clear()
        getallreceipe();
        
      },[])
      let getallreceipe= () =>{
        axios.get("http://localhost:3030/recipe")
        .then(response => setTitle(response.data))
    
      }
      let handleDelete = (id)=>{
        // alert(id)
        axios.delete(`http://localhost:3030/recipe/${id}`)
        .then(() => {
            // Refresh the list after deletion
            getallreceipe();
            setSelectedRecipe(null);
        })
      }




  return (
    <>
    {/* Recipe codes */}
    <div className="home-container">
        <div className="main">
            <div className="recipe-container">
                {/* From here to */}
                <div className="container-receipe">
       <div className="main-receipe">
        <div className="head">
            <div className="text">
                <h5>Receipe's List</h5>
            </div>
            <div className="icon">
            <button onClick={()=>{setAddMod(true)}} ><i className="fa-solid fa-plus" ></i></button>
            </div>
        </div>
        {/* Showing the image and add Recipe if there is no data in json */}
        {title.length === 0 && (
          <>
            <div className="image-receipe">
              <img src="/file.png" alt="No Recipe Available" />
            </div>
             <div className="d-flex justify-content-center">
             <button type="button" className="btn btn-primary" onClick={() => setAddMod(true)}>
               Add Recipe
             </button>
           </div>
           </>
          )}

         
          
          {/* Display the list of recipe name form json */}
          <div className='naming d-block'>
            {title.map((recipe, index) => (
              <button className= "btns"  key={index} onClick={() => setSelectedRecipe(recipe)}>{recipe.recipename}</button> 
            ))}
          </div>
        </div>
      </div>

                {/* here */}
                

            </div>

            {/* -------------------------------------------------------------------------------------- */}


            {/* Details Code */}

            <div className="detail-container">
                {/* From there To */}
                {selectedRecipe ? (
    <div className="detail-main">
      <div className="detail-header d-flex justify-content-between">     
        
        <div className="detail-text">
          <h3>
            
              {selectedRecipe.recipename}
            
             </h3>
        </div>
        <div className="detail-icon d-flex">
            
               
          {/* Edit button */}
          <button className='btn' onClick={()=>{setAddMod(true); setEditMod(true)}}> <i className="fa-solid fa-pen" /> </button>
           {/*Delete button  */}
          <button className='btn' onClick={()=>handleDelete(selectedRecipe.id)}> <i className="fa-solid fa-trash" ></i> </button>
          
       
          </div>        
      
      </div>

      <div className="detail-body">
        <div className="detail-ingredients">
          <h5>Ingredients</h5>
          <ul>
          {Array.isArray(selectedRecipe.ingredients) ? (
    selectedRecipe.ingredients.map((ing, index) => (
      <li key={index}>{ing}</li>
    ))
  ) : (
    selectedRecipe.ingredients.split('*').map((ing, index) => (
      <li key={index}>{ing.trim()}</li> 
    ))
  )}           

                   
          </ul>

        </div>
        <div className="deatil-description">
        <h5>Description</h5>
        <ul>
        {Array.isArray(selectedRecipe.description) ? (
    selectedRecipe.description.map((des, index) => (
      <li key={index}>{des}</li>
    ))
  ) : (
    selectedRecipe.description.split('*').map((des, index) => (
      <li key={index}>{des.trim()}</li> 
    ))
  )}                 
        
          </ul>


        </div>
      </div>
    </div>
      ) : (
      <div className="container-detail">
        <div className="detail-image">
                <img src="/food.png" alt="" />
            </div>
          <div className="text text-center">
            Select a receipe for details
          </div>
       </div>
    
    
  )}

                {/* Here */}

            </div>
        </div>
    </div>
    <Module
    showmodal={showAddMod}    
    onClose={() =>{ setAddMod(false); setEditMod(false); } }
    getallreceipe={getallreceipe}
    getedit = {showEditMod ? selectedRecipe : null}
    
     />
      
    </>
  )
}

export default Home
