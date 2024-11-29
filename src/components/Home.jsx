import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Module from './Module';


function Home() {
    let [title, setTitle] = useState([])
    let [showAddMod,setAddMod] = useState(false)
    let [showEditMod,setEditMod] = useState(false)
    const [clickedOneRecipe, setclickedOneRecipe] = useState(null);

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
            setclickedOneRecipe(null);
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
            <div className="text" style={{marginLeft:'10px', marginBottom:'10px'}}>
                <h5>Recipe's List</h5>
            </div>
            <div className="icon" style={{marginRight:'10px'}}>
            <button style={{background:'white',height:'20px', fontSize:'10px', fontWeight:'bolder'}} onClick={()=>{setAddMod(true)}} ><i className="fa-solid fa-plus" /></button>
            </div>
        </div>
        {/* Showing the image and add Recipe if there is no data in json */}
        {title.length === 0 && (
          <div className='justify-item-center' style={{marginTop:'180px'}}>
            <div className="image-receipe">
              <img src="/file.png" alt="No Recipe Available" />
            </div>
             <div className="d-flex justify-content-center mt-4">
             <button type="button" className="btn btn-primary" onClick={() => setAddMod(true)}>
               Add Recipe
             </button>
           </div>
           </div>
          )}

         
          
          {/* Display the list of recipe name form json */}
          <div className='naming d-block'>
            {title.map((recipe, index) => (
              <button className= "btns"  key={index} onClick={() => setclickedOneRecipe(recipe)}>{recipe.recipename}</button> 
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
                {clickedOneRecipe ? (
    <div className="detail-main">
      <div className="detail-header d-flex justify-content-between">     
        
        <div className="detail-text" style={{marginBottom:'10px'}}>
          <h3>
            
              {clickedOneRecipe.recipename}'s Recipe
            
             </h3>
        </div>
        <div className="detail-icon d-flex">
            
               
          {/* Edit button */}
          <button className='btn' onClick={()=>{setAddMod(true); setEditMod(true)}}> <i className="fa-solid fa-pen" /> </button>
           {/*Delete button  */}
          <button className='btn' onClick={()=>handleDelete(clickedOneRecipe.id)}> <i className="fa-solid fa-trash" ></i> </button>
          
       
          </div>        
      
      </div>

      <div className="detail-body">
        <div className="detail-ingredients">
          <h5>Ingredients</h5>
          <ul>
          {Array.isArray(clickedOneRecipe.ingredients) ? (
    clickedOneRecipe.ingredients.map((ing, index) => (
      <li key={index}>{ing}</li>
    ))
  ) : (
    clickedOneRecipe.ingredients.split('*').map((ing, index) => (
      <li key={index}>{ing.trim()}</li> 
    ))
  )}           

                   
          </ul>

        </div>
        <div className="deatil-description">
        <h5>Description</h5>
        <ul>
        {Array.isArray(clickedOneRecipe.description) ? (
    clickedOneRecipe.description.map((des, index) => (
      <li key={index}>{des}</li>
    ))
  ) : (
    clickedOneRecipe.description.split('*').map((des, index) => (
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
          <div className="text text-center fs-5 mt-3 ">
            Select a receipe for details!
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
    getedit = {showEditMod ? clickedOneRecipe : null}
    
     />
      
    </>
  )
}

export default Home
