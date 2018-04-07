import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import * as actions from '../actions'

class AddStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      pinCode: '',
      latitude: '',
      longitude: '',
      road: '',
      postOffice: '',
      city: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleInputChange(event) {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const {
      name,
      description,
      pinCode,
      latitude,
      longitude,
      postOffice,
      road,
      city
    } = this.state
    const location = {
      pinCode,
      latitude,
      longitude,
      postOffice,
      road,
      city
    }
    this.props.addStore(name, description, location)
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />
    }
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <p className="form-title">Add Store</p>
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            onChange={this.handleInputChange}
            value={this.state.name}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={this.handleInputChange}
            value={this.state.description}
            required
          />
          <input
            type="number"
            name="pinCode"
            placeholder="Pincode"
            onChange={this.handleInputChange}
            value={this.state.pinCode}
            required
          />
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            onChange={this.handleInputChange}
            value={this.state.latitude}
            required
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            onChange={this.handleInputChange}
            value={this.state.longitude}
            required
          />
          <input
            type="text"
            name="road"
            placeholder="Road"
            onChange={this.handleInputChange}
            value={this.state.road}
            required
          />
          <input
            type="text"
            name="postOffice"
            placeholder="Post Office"
            onChange={this.handleInputChange}
            value={this.state.postOffice}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={this.handleInputChange}
            value={this.state.city}
            required
          />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.props.errorMessage}</p>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return {
    errorMessage: auth.errorMessage,
    isAuthenticated: auth.isAuthenticated
  }
}

export default connect(mapStateToProps, actions)(AddStore)
