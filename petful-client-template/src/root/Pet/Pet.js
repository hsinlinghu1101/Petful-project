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

