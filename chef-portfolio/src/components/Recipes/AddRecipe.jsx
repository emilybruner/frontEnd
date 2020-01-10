import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addRecipe} from '../../store/actions';
import './recipe-form.scss';
const AddRecipe = props => {
    const username = localStorage.getItem('username');
    const [newRecipe, setNewRecipe] = useState({
        title: '',
        meal_type: '',
        image_url: 'https://images.unsplash.com/photo-1551987840-f62d9c74ae78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1176&q=80',
        ingredients: '',
        directions: '',
    });
    console.log('New recipe added', newRecipe)
    const handleSubmit = e => {
        e.preventDefault();
        props.addRecipe(username, newRecipe);
         props.history.push(`/chefdashboard/`);
    };
    const handleChanges = e => {
        setNewRecipe({...newRecipe, [e.target.name]: e.target.value});
    };
    
    return (
        <div className='recipe-container'>
            <img src='https://images.unsplash.com/photo-1551987840-f62d9c74ae78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1176&q=80' />
            <div>
             <form className='recipe-form' onSubmit={handleSubmit}>
             
            <div className='fields'>
            <h2>RECIPE</h2>
            <div className='form'>
                <div className='field'>
                <input className='title'
                   placeholder='Title'
                    name='title'
                    type='text'
                    value={newRecipe.title}
                    onChange={handleChanges}
                    />
                </div>
                <div className='field'>
                    <input as='select' className='select' placeholder='Meal Type' name='meal_type' value={newRecipe.meal_type}
                    onChange={handleChanges}>
                    </input>
                </div>
                <div className='field'>
                    
                    <input className='ingredients'
                    placeholder='Ingredients'
                    name='ingredients'
                    type='text'
                    value={newRecipe.ingredients}
                    onChange={handleChanges}
                    />
                    </div>
                <div className='field'>
                    <input className='directions'
                    placeholder='Directions'
                    name='directions'
                    type='text'
                    value={newRecipe.directions}
                    onChange={handleChanges}
                    />
                </div>
                
                <button type='submit'>Add Recipe</button>
                </div>
            </div>
        </form>
   </div>
   </div>
        
    )
}
const mapStateToProps = state => {
    return state;
  };
  
  export default connect(mapStateToProps, { addRecipe })(AddRecipe);