import React, { Component } from 'react'

class Postform extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      description: '',
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButonSubmit = this.handleButonSubmit.bind(this);
  }

  handleSubmit(e) {

    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleButonSubmit(e) {
    e.preventDefault();
    console.log('Form data', this.state)
    const data = {
      fullname: this.state.fullname,
      description: this.state.description
    }

    fetch("http://localhost:5000/person", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)

    }).then(res => res.json())
      .then(data => this.setState({ message: 'New Person added Successfully.', fullname: '', description: '' }))
      .catch(err => this.setState({ message: err }));

    this.props.updateParent('updateParentComponent')
  }


  render() {
    return (
      <React.Fragment>
        <h2>Add Person</h2>
        <div className={this.state.message ? "callout success" : ""}>{this.state.message}</div>
        <form onSubmit={this.handleButonSubmit}>
          <label>Full Name</label>
          <input type="text" name="fullname" value={this.state.fullname} required onChange={this.handleSubmit} />
          <label>Description</label>
          <textarea name="description" value={this.state.description} required onChange={this.handleSubmit} />
          <button type="submit" className="button"> Add Person </button>
        </form>
        <hr />
      </React.Fragment>
    )
  }
}

export default Postform;