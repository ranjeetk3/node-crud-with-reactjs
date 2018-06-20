import React, { Component } from 'react'
import Postform from './Postform';


import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      text: '',
      deleteMessage: ''
    }
    this.updatePerson = this.updatePerson.bind(this);
    this.deletePosts = this.deletePosts.bind(this);
  }

  updatePerson(data) {
    this.setState({ text: data });
  }

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillUpdate() {
    this.props.fetchPosts();
  }

  deletePosts(personID) {
    fetch(`http://localhost:5000/person/${personID}`, { method: 'delete' })
      .then(res => res.json())
      .then(data => this.setState({ deleteMessage: 'Person Deleted Successfully.' }));
  }

  confirmDelete(personId) {
    this.deletePosts(personId);
  }

  render() {

    const postItem = this.props.posts.map(person => (
      <tr key={person._id}>
        <td>{person.fullname}</td>
        <td>{person.description}</td>
        <td><span className="button" onClick={() => this.confirmDelete(person._id)}>Delete</span></td>
      </tr>
    ));

    return (
      <React.Fragment>
        <div className="row small-up-2 medium-up-3 large-up-4">
          {/* Add Post Form below */}

          <Postform updateParent={this.updatePerson} deletemessage={this.state.deleteMessage} />

          <h4>Person List view</h4>
          <table >
            <thead>
              <tr>
                <th width="250">Full Name</th>
                <th width="500">Description</th>
                <th width="200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postItem}
            </tbody>
          </table>
        </div>
      </ React.Fragment>
    )
  }
}


const mapStateToProps = state => ({
  posts: state.posts.items
})


export default connect(mapStateToProps, { fetchPosts })(Posts);