import React, { Component } from 'react'
import './Pet.css'


export default class Pet extends Component {
    render() {
        return (  
            <div className='pet'>
                <h3>Name: {this.props.pet.name}</h3>
                <img src={this.props.pet.imageURL} alt={this.props.pet.name}/>
                <p>Breed: {this.props.pet.breed}</p>
                <p>Gender: {this.props.pet.gender}</p>
                <p>Age: {this.props.pet.age}</p>
                <p>Description: {this.props.pet.description}</p>
                <p>Story: {this.props.pet.story}</p>
            </div>
        )
    }
}

// age: 3,
// breed: 'Golden Retriever',
// description: 'A smiling golden-brown golden retreiver listening to music.',
// gender: 'Male',
// imageURL: 'https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500',
// name: 'Zim',
// story: 'Owner Passed away'