import React, { Component } from "react";
import { render } from "react-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("stories")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
      <div>
        <div className="row mt-5">
          <div className="col-md-12 text-center">
            <h3 className="h-text">Welcome to Communiqué</h3>
            <h6>What do you want to share?</h6>
          </div>
        </div>
        <div className="row mt-3 text-center">
          <div className="col-md-12">
          <button className='btn btn-normal' onClick={this.handleShow}>Add Post<FontAwesomeIcon icon={faPlus} size='xs' className='ml-1'/></button>
            <a href="#" className="mt-3">View the Board</a>
          </div>
        </div>
        <ul>
          {this.state.data.map(story => {
            return (
              <li key={story.id}>
                {story.title} - {story.story}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);