import React, { Component } from 'react';
import Header from './Header';

class NewProject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <h1 className="title">New Project</h1>
      </div>
    );
  }
}

export default NewProject;
