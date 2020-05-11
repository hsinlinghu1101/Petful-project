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
      peopleData:[],
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
    console.log(123)
    this.setState({
      peopleData: data
    })
    if(this.state.peopleData.length) {
      setInterval(() => 
      this.tick()
     , 5000);
    }else{
      clearInterval( setInterval(() => 
      this.tick()
     , 5000));
    }
    
}



tick(){
  console.log(8)
  let randomNumber = Math.floor(Math.random() * 2) + 1
    console.log(randomNumber)
    if(randomNumber === 1) {
      DataApiService.deletePet('dog')
      .then( res => {
          DataApiService.getPet()
          .then(resp => 
            
            console.log(this.setState({ dogs: resp.dogs[0] }))
            )
          
          .catch(res => this.setState({ error: res.error }))
          DataApiService.getPeople()
          .then(res => this.setState({ peopleData: res }))
          .catch(res => this.setState({ error: res.error }))
      })   
    } else {
      DataApiService.deletePet('cat')
          .then( res => {
              DataApiService.getPet()
              .then(resp => 
                
                console.log(this.setState({ cats: resp.cats[0] })))
                
              .catch(res => this.setState({ error: res.error }))
              DataApiService.getPeople()
              .then(res => this.setState({ peopleData: res }))
              .catch(res => this.setState({ error: res.error }))
          })  
    }
}
  render(){
    const { error, dogs, cats, peopleData }  = this.state;
   
    return (     
      <div id='Adoption-Page'> 
        {error && <p>{error}</p>}
        <div className='pets'>
        <h1>Dogs</h1>
        <Pet pet={dogs}/>
        </div>
        <div className='pets'>
        <h1>Cats</h1>
        <Pet pet={cats}/>
        </div>
        <PeopleList createDataSuccess={this.createDataSuccess}  people={peopleData} dogs={dogs} cats={cats}/>
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