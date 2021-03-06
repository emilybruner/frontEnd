import React , {useState, useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const EditCard = (props) => {
    let recipeid = props.match.params.id;
    console.log(props)
 const [recipe, setRecipe] = useState({
    //  title: '',
    //  meal_type: '',
    //  image_url: '',
    //  description: '',
    //  ingredients: ''
 });
 const [editing, setEditing] = useState();
 
    const username = localStorage.getItem("username");
    // const id = match.params.id

useEffect(() => {
    axiosWithAuth()
        .get(`https://chef-portfolio-backend.herokuapp.com/chefs/${username}`)
        .then(response => {
            console.log(response)
            //console.log(recipeid)
            setRecipe(response.data.find(r => r.id === Number(recipeid)))
            
        })
        .catch(error => {
            console.log("The data was not returned", error)
        })
}, [])
  
    const editer = e => {
      e.preventDefault();
      setEditing(recipe)
      console.log(recipe);
      axiosWithAuth()
        .put(`https://chef-portfolio-backend.herokuapp.com/chefs/${username}/${recipe.id}`, recipe
        )
        .then(res => {
          props.history.push("/chefdashboard")
        })
        .catch(err => {
          console.log(err);
        });
        
    };


const handleChanges = e => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };


    return (
        <div>
            <form onSubmit={editer}>
                    
     
            <div>   
            <h2>Edit Recipe Card</h2>
            <input
            name="title"
            type="text"
            value={recipe.title}
            onChange={handleChanges}
            />
            <input
            name="meal_type"
            type="test"
            value={recipe.meal_type}
            onChange={handleChanges}
            />
            <input
            name="image_url"
            type="text"
            value={recipe.image_url}
            onChange={handleChanges}
            />
            <input
            name="ingredients"
            type="text"
            value={recipe.ingredients}
            onChange={handleChanges}
            />
            <input
            name="directions"
            type="text"
            value={recipe.directions}
            onChange={handleChanges}
            />
            <button type="submit">save changes</button>

            </div>   
    
    </form>
    </div>

    )
}


export default EditCard;