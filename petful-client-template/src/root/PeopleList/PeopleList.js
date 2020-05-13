import React, { Component } from 'react'
import DataApiService from '../../Services/data-api-service'
import './PeopleList.css'

export default class PeopleList extends Component {
    static defaultProps = {
        adoptSuccess: () => { }

    }
    state = {
        clicked: false,
        newPerson: '',
        name: '',
        confirm: false
    }

    handleclicked = (event) => {
        event.preventDefault();

        this.setState({
            clicked: true
        })
    }

    handleCancel = (event) => {
        event.preventDefault();

        this.setState({
            clicked: false
        })
    }

    addPerson = (event) => {
        event.preventDefault();
        const { newPerson } = event.target
        this.setState({
            name: newPerson.value
        })
        DataApiService.postPeople({
            newPerson: newPerson.value,
        })
            .then(data => {
                newPerson.value = '';
                this.props.createDataSuccess(data)
                this.setState({
                    clicked: false,
                    confirm: false
                })
            })
     }


    catConfirmation = () => {
        this.setState({
            confirm: true
        })
        DataApiService.deletePet('cats')
    }
    dogConfirmation = () => {
        this.setState({
            confirm: true
        })
        DataApiService.deletePet('dogs')
    }
    bothConfirmation = () => {
        this.setState({
            confirm: true
        })
        DataApiService.deletePet('both')
    }


    handleClose = (event) => {
        event.preventDefault();
        window.location.reload(false);
    }

    generatePeopleJSX(person, index) {
        if (index > 4) {
            this.props.stopTock()
        }
        else if (index === 0 && person === this.state.name) {
            this.props.stopFive()
            if (this.props.dogs && this.props.cats) {
                return (
                    <div key={index}>
                        <div className='People-List first'>{index + 1}. {person}</div>
                        <button type='button' className='adopt' onClick={this.catConfirmation} disabled={this.state.confirm}>Adopt Cat</button>
                        <button type='button' className='adopt' onClick={this.dogConfirmation} disabled={this.state.confirm}>Adopt Dog</button>
                        <button type='button' className='adopt' onClick={this.bothConfirmation} disabled={this.state.confirm}>Adopt Both</button>
                        {this.state.confirm &&
                            <div>
                                <h2>Congratulation!</h2><button type='button' onClick={this.handleClose}>close</button>
                            </div>}
                    </div>)
            }
            else if (this.props.dogs) {
                return (
                    <div key={index}>
                        <div className='People-List first'>{index + 1}. {person}</div>
                        <button type='button' className='adopt' onClick={this.dogConfirmation} disabled={this.state.confirm}>Adopt Dog</button>
                        {this.state.confirm &&
                            <div>
                                <h2>Congratulation!</h2><button type='button' onClick={this.handleClose}>close</button>
                            </div>}
                    </div>)
            }

            else if (this.props.cats) {
                return (
                    <div key={index}>
                        <div className='People-List first'>{index + 1}. {person}</div>
                        <button type='button' className='adopt' onClick={this.catConfirmation} disabled={this.state.confirm}>Adopt Cat</button>
                        {this.state.confirm &&
                            <div>
                                <h2>Congratulation!</h2><button type='button' onClick={this.handleClose}>close</button>
                            </div>}
                    </div>)
            }
        }
            else {
                return (
                    <div key={index}>
                        <div className='People-List first'>{index + 1}. {person}</div>
                    </div>)
            }

    }

    render() {

        return (
            <div id='People-List'>
                <h2 className='list'>Current Adopter List</h2>

                {Object.values(this.props.people).map((x, index) => this.generatePeopleJSX(x, index))}

                <button className='join' onClick={this.handleclicked}> Join</button>
                {this.state.clicked
                    ? <form onSubmit={this.addPerson}>
                        <label htmlFor='newPerson'>Your Name:</label>
                        <input type='text' name='newPerson' id='newPerson' required></input><br></br>
                        <button type='submit'>submit</button>
                        <button type='button' onClick={this.handleCancel}>cancel</button>
                    </form>
                    : <div></div>
                }

            </div>
        )
    }
}
