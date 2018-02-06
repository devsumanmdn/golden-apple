import React, { Component } from 'react'
import axios from 'axios'
import '../styles/stores.css'
import '../styles/loader.css'
import { Link } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import Loader from './Loader'

class Stores extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      err: '',
      done: false
    }
  }

  componentDidMount() {
    axios
      .get('/api/stores')
      .then(res => {
        this.setState({ data: res.data, done: true })
        console.log(res.data)
      })
      .catch(e => {
        this.setState({
          err: e.response.status,
          done: true
        })
        console.log(e)
      })
  }

  render() {
    if (this.state.done === true) {
      return (
        <div className="stores-div">
          {this.state.err !== ''
            ? 'Respose Status: ' + this.state.err
            : this.state.data.map(store => (
                <Store key={store._id} data={store} />
              ))}
        </div>
      )
    } else {
      return <Loader />
    }
  }
}

const Store = props => {
  return (
    <Link to={'/store/' + props.data._id}>
      <div className="store">
        <div className="storeDetails">
          <div className="store-head">
            <img
              className="store-logo"
              src="index.jpeg"
              alt="Store"
              height="50"
              width="50"
            />
            <div className="storehead-right">
              <p className="storeName">{props.data.name}</p>
              <StarRatings
                rating={3}
                isSelectable={false}
                isAggregateRating={true}
                starWidthAndHeight="15px"
                starSelectingHoverColor="#343243"
                starSpacing="2px"
                numOfStars={5}
              />
            </div>
          </div>
          <p className="storeDescription">
            Description:{' ' + props.data.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Stores
