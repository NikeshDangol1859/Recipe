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
        if (props.getedit) {            
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

   

      
     


  return (
    <>
    <Modal show={showhide} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
    <Modal.Header closeButton onClick={()=>{props.onClose()}}>  {/*onClick={()=>{props.getaddreceipe()}}*/}
          <Modal.Title id="contained-modal-title-vcenter">{props.getedit ? 'Edit Recipe' : 'Add Recipe'}</Modal.Title>
        </Modal.Header>      

        <Modal.Body>
            <div className='container p-3'>
                <label htmlFor="recipename" className="form-label">Recipe Name</label>
                <input type="text" id="recipename" className="form-control" name='recipename' placeholder='Enter the recipe name' value={input_data.recipename} onChange={setData} autoComplete='off'/> 
                <div className="inputs">
                    <div className="ingredients-recipe ">
                        <label htmlFor="ingredients" className="form-label">Ingredients</label>
                        <textarea type="text" id="ingredients" className="form-control" name='ingredients' rows="6"
                        placeholder='Enter each itigredients separated by asterik for ex. 1 table spoon sugar 2 table spoon honey' value={input_data.ingredients} onChange={setData}/>

                    </div>
                    <div className="description-recipe">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name='description' rows="6"
                        placeholder='Enter each description separated by astenk For ex. Boil water for 5mins. Add soger.' value={input_data.description} onChange={setData}/>
                    </div>
                </div>

                            
                
            </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{props.onClose()}}>
            Close
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
