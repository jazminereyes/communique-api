import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Modal from './Modal';

class Main extends Component{
    constructor(props){
      super(props)
  
      this.state = {
        stories: [],
        loaded: false,
        viewBoard: false,
        placeholder: "Loading",
      }
  
      this.displayBoard = this.displayBoard.bind(this);
      this.changeValue = this.changeValue.bind(this);
      this.addLike = this.addLike.bind(this);
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
  
    displayBoard(e){
      e.preventDefault();
      this.setState({
        viewBoard: true
      })
    }
  
    changeValue(name, story){
      let postData = {
        'name': name,
        'story': story,
        'likes': 0,
      }
  
      this.setState({
        stories: [...this.state.stories, postData]
      });
    }
  
    addLike(row){
      const stories = this.state.stories;
      stories[row].likes += 1;
      this.setState({
        stories: stories
      })
    }
  
    render(){
      const {stories, loaded, viewBoard, placeholder} = this.state
      return(
        <div>
          <form>
            <Modal formValue={this.changeValue}/>
          </form>
          <div className="row mt-3 text-center" style={{display: `${viewBoard ? 'none': 'block'}`}}>
            <div className="col-md-12">
              <a href="#" className="mt-3" onClick={this.displayBoard}>View the Board</a>
            </div>
          </div>
          { viewBoard ? [
            ( stories.length > 0 ?
              <div className='row mt-4'>
                <div className='col-md-1'></div>
                <div className='col-md-10'>
                  <div className="row">
                  { stories.map((story, index) =>
                    (
                      <div className="col-md-3" key={index}>
                        <div className='card'>
                          <div className='card-body'>
                            <p>{story.story}</p>
                            <h6 className='semi-bold text-right'>-&nbsp;{story.user}</h6>
                          </div>
                          <div className='card-footer p-0 text-right'>
                            <button className='btn btn-icon p-2' onClick={() => this.addLike(index)}><FontAwesomeIcon icon={faHeart} className='heart-btn'/></button>
                            { story.likes > 0 ? <span className="mr-3 semi-bold">{story.likes}</span> : null}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            :(
              <div className="row mt-5">
                <div className="col-md-12 text-center">
                  <img src={process.env.PUBLIC_URL + '/static/img/person.jpg'} className="img-fluid" height="300px" width="300px"/>
                  <h5 className="semi-bold">Oops. No stories yet. Be the first one to share!</h5>
                </div>
              </div>
            ))]
          : (
            <></>
          )}
        </div>
      )
    }
  }
  
  export default Main;
