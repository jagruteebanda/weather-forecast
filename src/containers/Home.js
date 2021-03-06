import React, { Component } from 'react';

import '../styles/Home.css';

class Home extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  weatherData: null,
                  // imageFile: require('../images/jnpt.jpg')
                  imageError: null,
                  imageDetails: {}
            }
      }

      render() {
            // const imageFile = require(this.state.imageFile);
            return (
                  <div className="app">
                        <div className="header">
                              <img src={require("../images/weather.png")} width="80" height="80"></img>&nbsp;&nbsp;
                              <h1 className="header-title">Weather-Forecast</h1>
                        </div>
                        <div className="app-body">
                              <form
                                    id="image-form"
                                    method="post"
                                    encrypt="multipart/form-data"
                                    onSubmit={(e) => {
                                          e.preventDefault();
                                          // let formData = new FormData();
                                          // formData.append('lat', this.state.imageDetails.coordinates.lat);
                                          // formData.append('long', this.state.imageDetails.coordinates.long);
                                          // formData.append('filename', this.state.imageDetails.filename);

                                          const data = {
                                                lat: this.state.imageDetails.coordinates.lat, 
                                                long: this.state.imageDetails.coordinates.long, 
                                                filename: this.state.imageDetails.filename
                                          }

                                          var request = new XMLHttpRequest();
                                          request.open("POST", "http://localhost:3002/getWeather");
                                          request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                                          request.send(JSON.stringify(data));
                                          request.onload = () => {
                                                console.log(JSON.parse(request.response));
                                                let response = JSON.parse(request.response);

                                                if (response.code === 200) {
                                                      this.setState({
                                                            weatherData: { ...response.data }
                                                      });
                                                } else {
                                                      this.setState({
                                                            weatherData: {
                                                                  message: "Weather data not available. Please try again later!"
                                                            },
                                                      })
                                                }

                                          };
                                    }
                                    }>
                                    <label className="file-input">
                                          Choose image file
                                          <input
                                                id="imageFile"
                                                type="file"
                                                name="imageFile"
                                                required
                                                accept="image/png, image/jpeg"
                                                onChange={(e) => {
                                                      // console.log(e.target.files[0]);
                                                      let formData = new FormData();
                                                      formData.append('file', e.target.files[0]);

                                                      var request = new XMLHttpRequest();
                                                      request.open("POST", "http://localhost:3002/checkImage");
                                                      request.send(formData);
                                                      request.onload = () => {
                                                            console.log(JSON.parse(request.response));
                                                            let response = JSON.parse(request.response);

                                                            if (response.code === 200) {
                                                                  this.setState({
                                                                        imageDetails: { ...response.data },
                                                                        imageError: response.message
                                                                  });
                                                            } else {
                                                                  this.setState({
                                                                        imageError: `Something's not right! Please try again later!`
                                                                  })
                                                            }

                                                      };
                                                }}
                                          />
                                    </label>
                                    {
                                          (this.state.imageError) &&
                                          <h4 style={{ color: 'red' }}>{this.state.imageError}</h4>
                                    }
                                    <input className="submit-button" type="submit" />
                              </form>
                              {
                                    (this.state.weatherData) &&
                                    <div className="weather-details">
                                          <div className="weather-card">
                                                <img id="weather-image"
                                                      src={require("../images/weather.png")} width="200px" height="200px"></img>
                                                {/* <img id="weather-image" src={(this.state.weatherData) ? this.state.weatherData.filePath : null} width="100px" height="100px"></img> */}
                                                <table>
                                                      <tbody>
                                                            <tr>
                                                                  <td><b>Coordinates</b></td>
                                                                  <td>{`${this.state.weatherData.coord.lat} ${this.state.weatherData.coord.lon}`}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td><b>Location</b></td>
                                                                  <td>{this.state.weatherData.name}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td><b>Description</b></td>
                                                                  <td>{this.state.weatherData.weather[0].description}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td><b>Temperature</b></td>
                                                                  <td>{this.state.weatherData.main.temp}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td><b>Pressure</b></td>
                                                                  <td>{this.state.weatherData.main.pressure}</td>
                                                            </tr>
                                                            <tr>
                                                                  <td><b>Humidity</b></td>
                                                                  <td>{this.state.weatherData.main.humidity}</td>
                                                            </tr>
                                                      </tbody>
                                                </table>
                                          </div>
                                    </div>
                              }
                        </div>

                  </div>

            );
      }

}

export default Home;