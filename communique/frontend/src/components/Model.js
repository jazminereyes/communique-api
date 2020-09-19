import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal as BootstrapModal } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

class Modal extends Component{
  constructor(props){
    super(props)

    this.state = this.getInitialState();

    this.handleClose = () => this.setState(this.getInitialState());

    this.handleShow = this.handleShow.bind(this);
    this.handleStory = this.handleStory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState(){
    return {
      addStory: false,
      userName: '',
      userStory: '',
      submitted: false,
      show: false
    }
  }

  handleShow(e){
    e.preventDefault();
    this.setState({
      show:true
    });
  }

  displayAlert(text){
    swal({
      title: "Oops",
      text: text,
      icon: process.env.PUBLIC_URL + '/static/img/require.jpg',
    });
  }

  handleStory(e){
    e.preventDefault();
    if(this.state.userName){
      this.setState({
        addStory: true
      });
    }else{
      this.displayAlert("You haven't told us your name yet.");
    }

  }

  handleChange(e) {
    if(this.state.addStory){
      this.setState({
        userStory: e.target.value
      });
    }else{
      this.setState({
        userName: e.target.value
      });
    }
  }

  handleSubmit(){
    if(this.state.userStory){
      this.props.formValue(
        this.state.userName,
        this.state.userStory
      );

      swal({
        title: "Story Submitted!",
        text: "Thanks for sharing with us. Your story can be viewed in the board.",
        icon: "success",
      })
      .then(() => {
        this.setState(this.getInitialState());
      });
    }else{
      this.displayAlert("Tell us your story before you go!");
    }

  }

  render(){
    return(
      <div>
        <button className='btn btn-normal' onClick={this.handleShow}>Add Post<FontAwesomeIcon icon={faPlus} size='xs' className='ml-1'/></button>
        <BootstrapModal show={this.state.show} onHide={this.handleClose} centered>
          <BootstrapModal.Header closeButton>
            <BootstrapModal.Title>Add Post</BootstrapModal.Title>
          </BootstrapModal.Header>
          <BootstrapModal.Body>
            { this.state.addStory ?
              <div>
                <h6 className="semi-bold">Tell us your story...<span className="text-danger">*</span></h6>
                <textarea className="form-control" rows="8" name="story" value={this.state.userStory} onChange={this.handleChange}/>
              </div>
            :(
              <div>
                <h6 className="semi-bold">What's your name?<span className="text-danger">*</span></h6>
                <input className="form-control" name="user" value={this.state.userName} onChange={this.handleChange}/>
              </div>
            ) }
          </BootstrapModal.Body>
          <BootstrapModal.Footer>
            <button id="submit-btn" type="submit" className="btn btn-block btn-primary" style={{display: `${ this.state.addStory ? 'block': 'none'}`}} onClick={this.handleSubmit}>Submit</button>
            <button id="next-btn" type="button" className="btn btn-block btn-primary" onClick={this.handleStory} style={{display: `${ this.state.addStory ? 'none': 'block'}`}}>Next</button>
          </BootstrapModal.Footer>
        </BootstrapModal>
      </div>
    )
  }
}

export default Modal;
