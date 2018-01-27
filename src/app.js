import React, { Component } from "react";
import ReactDOM from "react-dom";
import Map from "./components/Map";
import Places from "./components/Places";
import superagent from "superagent";

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: []
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    const url =
      "https://api.foursquare.com/v2/venues/search?v=20140806&ll=22.42482,87.30856&client_id=VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD&client_secret=UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ";

    superagent
      .get(url)
      .query(null)
      .set("Accept", "text/json")
      .end((error, response) => {
        const venues = response.body.response.venues;
        console.log(JSON.stringify(venues));

        this.setState({
          venues: venues
        });
      });
  }

  render() {
    const location = {
      lat: 22.42482,
      lng: 87.30856
    };

    return (
      <div>
        This is the REACT APP!
        <div
          style={{
            width: 600,
            height: 300,
            background: "red"
          }}
        >
          <Map center={location} markers={this.state.venues} />
        </div>
        <Places venues={this.state.venues} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
