import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '..//sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {

  constructor(){
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);


    //initial state
    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount(){
    // this runs before rendering App
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });

    //check for orders in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
  }

addFish(fish){
  // update state
  //copy state
  const fishes = {...this.state.fishes};
  //add new fish
  const timestamp = Date.now();
  fishes[`fish-${timestamp}`] = fish;

  //this.state.fishes.fish1 = fish;

  //set state
  this.setState({fishes});
}

updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

loadSamples(){
  this.setState({
    fishes: sampleFishes
  });
}

addToOrder(key){

  //copy state
  const order = {...this.state.order};

  // update / add new fishes
  order[key] = order[key] + 1 || 1;

  // set state
  this.setState({ order });
}


  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} />
      </div>
    )
  }
}

export default App;
