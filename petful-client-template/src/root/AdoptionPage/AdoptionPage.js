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
      adopters: [
        'Mario Speedwagon',
        'Petey Cruiser',
        'Anna Sthesia',
        'Paul Molive',
        'Anna Mull',
        'Gail Forcewind',
        'Paige Turner',
        'Bob Frapples',
        'Mario Speedwagon',
        'Petey Cruiser',
        'Anna Sthesia',
        'Paul Molive',
        'Anna Mull',
        'Gail Forcewind',
        'Paige Turner',
        'Bob Frapples'
      ],
      newPerson: '',
      indexAdopter:0  
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
    this.startFive() 
    this.startTock()
  }


  createFakeAdopter = (data) => {
    this.setState({
      peopleData: data
    })
  }
  

 startFive = ()=>{
  this.intervalId= setInterval(() => {
    this.tick()
  }, 5000);
 }

 stopFive = ()=>{
   clearInterval(this.intervalId)
 }

 startTock= ()=>{
  this.intervalIds= setInterval(() => {
    this.tock()
  }, 5000);
 }

 stopTock = ()=>{
  clearInterval(this.intervalIds)
}

tock(){
  DataApiService.postPeople( 
    {newPerson:this.state.adopters[this.state.indexAdopter] }   
  )
  .then(data => {
    this.createFakeAdopter(data)
    })
    
  this.setState({
    indexAdopter: this.state.indexAdopter +1
  })
} 


 
   tick(){     
    
        let randomNumber = Math.floor(Math.random() * 2) + 1
        if(randomNumber === 1) {
       DataApiService.deletePet('dogs')
        .then( res => {
              DataApiService.getPet()
              .then(resp => {
                this.setState({ dogs: resp.dogs[0] })
                })
              
              .catch(res => this.setState({ error: res.error }))
              DataApiService.getPeople()
              .then(res => this.setState({ peopleData: res }))
              .catch(res => this.setState({ error: res.error }))
          })   
        } else {
          DataApiService.deletePet('cats')
            .then( res => {
                  DataApiService.getPet()
                  .then(resp =>{ 
                    this.setState({ cats: resp.cats[0] })})
                  .catch(res => this.setState({ error: res.error }))
                  DataApiService.getPeople()
                  .then(res => this.setState({ peopleData: res}))
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
        <PeopleList createDataSuccess={this.createDataSuccess}  stopFive={this.stopFive} stopTock={this.stopTock} people={peopleData} dogs={dogs} cats={cats}/>
      </div>
    )
  }
};

