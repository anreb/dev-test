import React, { useState, useContext } from 'react';
import './EditForm.css'

function EditForm({ data }) {
    console.log(data)
  const [formData, setFormData] = useState({...data});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('submiting')
    const response = await fetch('http://localhost:3000/api/update', 
        {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data))
          } else {
            console.log('Update failed');
        }
    }

  const handleChange = (event) => {
    event.preventDefault();
    if(event.target.id === 'first' || event.target.id === 'last'){
        console.log('settind data')
        console.log(event.target.id, event.target.value)
        setFormData(prev => {
            console.log(prev)
            return {
                ...prev,
                name: {
                    first:prev.name.first,
                    last: prev.name.last,
                    [event.target.id]: event.target.value
                }
            }
        })
    } else {
        console.log('settind data')
        console.log(event.target.id, event.target.value)
        setFormData(prev => {
            console.log(prev)
            return {
            ...prev,
            [event.target.id]: event.target.value
            }
        })
    }
  }
  console.log(formData)
  return (
    <form onSubmit={handleSubmit}>
      <div className='formInput'>
        <label htmlFor="name">First Name:</label>
        <input
          type="text" 
          id="first" 
          value={formData.name.first} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="lastName">Last Name:</label>
        <input 
          type="text" 
          id="last" 
          value={formData.name.last} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="phone">Phone:</label>
        <input 
          type="tel" 
          id="phone" 
          value={formData.phone} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="address">Address:</label>
        <input 
          type="text" 
          id="address" 
          value={formData.address} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="company">Company:</label>
        <input 
          type="text" 
          id="company" 
          value={formData.company} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="eyeColor">Eye Color:</label>
        <input 
          type="text" 
          id="eyeColor" 
          value={formData.eyeColor} 
          onChange={handleChange} 
        />
      </div>
      <div className='formInput'>
        <label htmlFor="age">Age:</label>
        <input 
          type="text" 
          id="age"
          value={formData.age} 
          onChange={handleChange} 
        />
      </div>
      <div className='submit'>
        <button className='submitButton' type="submit">UPDATE</button>
      </div>
    </form>
  );
}

export default EditForm;