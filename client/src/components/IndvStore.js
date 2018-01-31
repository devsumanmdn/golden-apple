import React, { Component } from 'react'
import axios from 'axios'
import '../styles/IndvStore.css'
import StarRatings from 'react-star-ratings'

class IndvStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
      err: '',
      done: false,
      rating: 4,
      personalRating: false
    }
    this.changeRating = this.changeRating.bind(this)
  }

  componentDidMount() {
    axios
      .get('/api/store/' + this.props.match.params.storeId)
      .then(res => {
        this.setState({ data: res.data, done: true })
      })
      .catch(e => {
        this.setState({
          err: e.response.status,
          done: true
        })
        console.log(e)
      })
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating,
      personalRating: true
    })
  }

  render() {
    if (this.state.done === true) {
      return (
        <div className="IndvStoreDiv">
          {this.state.err !== '' ? (
            'Respose Status: ' + this.state.err
          ) : (
            <Store
              data={this.state.data}
              state={this.state}
              changeRating={this.changeRating}
            />
          )}
        </div>
      )
    } else {
      return <div>Loading...</div>
    }
  }
}

const Store = props => {
  return (
    <div>
      <div className="IndvStoreHead">
        {/* {JSON.stringify(props.data)} */}
        <div className="IndvStoreName">Name: {props.data.name}</div>{' '}
        <div className="IndvStoreRating">
          <StarRatings
            rating={props.state.rating}
            isSelectable={true}
            isAggregateRating={false}
            starRatedColor={props.state.personalRating ? 'black' : 'gray'}
            starSelectingHoverColor="black"
            starWidthAndHeight="25px"
            starSpacing="2px"
            changeRating={props.changeRating}
            numOfStars={5}
          />
        </div>{' '}
        <div className="IndvStorePincode">
          Pincode: {props.data.location.pinCode}
        </div>
        <div className="IndvStoreCity">City: {props.data.location.city}</div>
        <div className="IndvStoreDescription">
          Description: {props.data.description}
        </div>
      </div>
    </div>
  )
}

export default IndvStore
