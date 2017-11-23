import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: {} };
    this.userId = searchParser(window.location.search).user || 1;
  }

  componentDidMount() {
    fetch(`/users/${this.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to React, {this.state.user.name}
          </h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>client/src/App.js</code> and save to
          reload.
        </p>
      </div>
    );
  }
}

function searchParser(search = {}) {
  return search
    .slice(1)
    .split("&")
    .reduce((params, param) => {
      var [key, val] = param.split("=");
      param && (params[key] = val);

      return params;
    }, {});
}

export default App;
