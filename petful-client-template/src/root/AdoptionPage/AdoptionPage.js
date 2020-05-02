import React from 'react';
import PeopleList from '../PeopleList/PeopleList';
import Pet from '../Pet/Pet';
import DataApiService from '../../Services/data-api-service';
import './AdoptionPage.css';

export default class AdoptionPage extends React.Component{
   
  constructor(props) {
    super(props);
    this.state={
      dogs:[],
      cats:[],
      peopleData:'',
      error:null,
      date: null
    } 
  }

  componentDidMount() {   
     DataApiService.getPet()
      .then(res=> this.setState({
            dogs: res.dogs[0],
            cats: res.cats[0]
          })) 
      .catch(res=> this.setState({
            error:JSON.stringify(res.error)
          }))
  
    DataApiService.getPeople()
      .then(peopleData=> {
        this.setState({
          peopleData
      })
    }) 
      .catch(res=> this.setState({
          error:JSON.stringify(res.error)
      }))  
  }
 
  createDataSuccess = (data) => {
    this.setState({
      peopleData: data
    })
   
  }
   
  render(){
    const { error, dogs, cats }  = this.state;
    return (     
      <div id='Adoption-Page'> 
        {error && <p>{error}</p>}
        <Pet pet={dogs}/>
        <Pet pet={cats}/>
        <PeopleList createDataSuccess={this.createDataSuccess}  people={this.state.peopleData}/>
      </div>
    )
  }
};

/* this.timeout = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * 2) + 1
      
      if(randomNumber === 1) {
          DataApiService.deletePet('dog')
          .then( res => {
              DataApiService.getPets()
              .then(res => this.setState({ dogs: res.dogs[0] }))
              .catch(res => this.setState({ error: res.error }))
              DataApiService.getPeople()
              .then(res => this.setState({ people: res }))
              .catch(res => this.setState({ error: res.error }))
          })
          .catch(res => this.setState({ error: res.error }))
      } else {
        DataApiService.deletePet('cat')
          .then( res => {
              DataApiService.getPets()
              .then(res => this.setState({ cats: res.cats[0] }))
              .catch(res => this.setState({ error: res.error }))
              DataApiService.getPeople()
              .then(res => this.setState({ people: res }))
              .catch(res => this.setState({ error: res.error }))
          })
          .catch(res => this.setState({ error: res.error }))
      }
    }, 5000);*/