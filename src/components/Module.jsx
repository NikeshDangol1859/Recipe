import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function Module(props) {
    let showhide = props.showmodal

    let [input_data, setinpData] = useState(
        {
          recipename: '',
          ingredients: '',
          description: '',
  
        }
      )
      let [error,seterror]=useState({})

    useEffect(() => {
        if (props.getedit) {
          setinpData({
            recipename: props.getedit.recipename,
            ingredients: props.getedit.ingredients,
            description: props.getedit.description,
          });
        } else {          
          setinpData({
            recipename: '',
            ingredients: '',
            description: '',
          });
        }
      }, [props.getedit, showhide]);

    

    

    let setData=(e)=>{ 
      setinpData({...input_data, [e.target.name]:e.target.value})

    }

    let saveData = () =>{
      let dataValidation = {}
        if(!input_data.recipename){
          dataValidation.recipename = "RecipeName is required"
        }
        if(!input_data.ingredients){
          dataValidation.ingredients = "Ingredients is required"
        }
        if(!input_data.description){
          dataValidation.description = "Description is required"
        }

        seterror (dataValidation)

        if(Object.keys(dataValidation).length==0)
          {

        if (props.getedit == "") {            
            axios.put(`http://localhost:3030/recipe/${props.getedit.id}`, input_data)
              .then(() => {
                props.getallreceipe(); 
                props.onClose();        
              })
              .catch((error) => alert(error));
          } else {
            
            axios.post('http://localhost:3030/recipe', input_data)
              .then(() => {
                props.getallreceipe();  
                props.onClose();        
              })
              .catch((error) => alert(error));
          }
        }
      
    }

   

      
     


  return (
    <>
    <Modal show={showhide} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='rounded-0'
      >
    <Modal.Header closeButton onClick={()=>{props.onClose()}}>  {/*onClick={()=>{props.getaddreceipe()}}*/}
          <Modal.Title id="contained-modal-title-vcenter">{props.getedit ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
        </Modal.Header>      

        <Modal.Body>
            <div className='container p-3 rounded-0'>
                <label htmlFor="recipename" className="form-label">Recipe Name *</label>
                <input type="text" id="recipename" className="form-control" name='recipename' placeholder='Enter the recipe name'  value={input_data.recipename} onChange={setData} autoComplete='off' />
                {error.recipename && <span className='text-danger'>{error.recipename} </span>} <br></br> 
                <div className="inputs">
                    <div className="ingredients-recipe ">
                        <label htmlFor="ingredients" className="form-label">Receipe Ingredients *</label>
                        <textarea type="text" id="ingredients" className="form-control" name='ingredients' rows="6"
                        placeholder='Enter each itigredients separated by asterik for ex. 1 table spoon sugar 2 table spoon honey'  value={input_data.ingredients} onChange={setData}/>
                {error.ingredients && <span className='text-danger'>{error.ingredients} </span>} <br></br> 


                    </div>
                    <div className="description-recipe">
                        <label htmlFor="description" className="form-label">Receipe Description *</label>
                        <textarea className="form-control" id="description" name='description' rows="6"
                        placeholder='Enter each description separated by astenk For ex. Boil water for 5mins. Add soger.'  value={input_data.description} onChange={setData} />
                {error.description && <span className='text-danger'>{error.description} </span>} <br></br> 

                    </div>
                </div>

                            
                
            </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button style={{border:'1px solid black'}} variant="Light" onClick={()=>{props.onClose()}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveData}>
          {props.getedit ? 'Edit Recipe' : 'Save Recipe'}
          </Button>
        </Modal.Footer>

     

    </Modal>
      
    </>
  )
}

export default Module
