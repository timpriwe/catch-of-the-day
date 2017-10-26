import React from 'react';
import { getFunName } from '../helpers.js';

class StorePicker extends React.Component {

// constructor(){
//   super();
//   this.goToStore = this.goToStore.bind(this);
// }

goToStore(event){
  event.preventDefault();
  // grab text from box
 const storeId = this.storeInput.value;
  //transition from / to /store/:storeId
  this.context.router.transitionTo(`/store/${storeId}`);

}

  render() {
    return (
    <form className="store-selector" onSubmit={this.goToStore.bind(this)}>
      <h2>Please Enter A Store Name</h2>
      <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
      <button type="submit"> Visit Store -> </button>
    </form>
    )
  }
}

StorePicker.contextTypes = {

  router: React.PropTypes.object
}

export default StorePicker;
