import React, { Component } from 'react';

import '../styles/Home.css';

class Home extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  weatherData: null,
                  // imageFile: require('../images/jnpt.jpg')
            }
      }

      render() {
            // const imageFile = require(this.state.imageFile);
            return (
                  <div className="app">
                        <div className="header">
                              <h1 className="header-title">Weather-Forecast</h1>
                        </div>
                        <div className="app-body">
                              <form
                                    id="image-form"
                                    method="post"
                                    encrypt="multipart/form-data"
                                    onSubmit={(e) => {
                                          e.preventDefault();
                                          let formData = new FormData();
                                          let imagefile = document.querySelector('#imageFile');
                                          formData.append('file', imagefile.files[0]);

                                          var request = new XMLHttpRequest();
                                          request.open("POST", "http://localhost:3002/storeImage");
                                          request.send(formData);
                                          request.onload = () => {
                                                // console.log(JSON.parse(request.response));
                                                let response = JSON.parse(request.response);
                                                // const imageFile = require(response.data.filePath);
                                                if (response.code === 200) {
                                                      this.setState({
                                                            weatherData: { ...response.data },
                                                            // imageFile
                                                      }, () => {
                                                            // console.log(this.state.weatherData);
                                                      });
                                                } else {
                                                      this.setState({
                                                            weatherData: {
                                                                  message: "Weather data not available. Please try again later!"
                                                            }
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
                                          />
                                    </label>

                                    <input className="submit-button" type="submit" />
                              </form>
                        </div>
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
                                                            <td>Coordinates</td>
                                                            <td>{`${this.state.weatherData.coord.lat} ${this.state.weatherData.coord.lon}`}</td>
                                                      </tr>
                                                      <tr>
                                                            <td>Location</td>
                                                            <td>{this.state.weatherData.name}</td>
                                                      </tr>
                                                      <tr>
                                                            <td>Description</td>
                                                            <td>{this.state.weatherData.weather[0].description}</td>
                                                      </tr>
                                                      <tr>
                                                            <td>Temperature</td>
                                                            <td>{this.state.weatherData.main.temp}</td>
                                                      </tr>
                                                      <tr>
                                                            <td>Pressure</td>
                                                            <td>{this.state.weatherData.main.pressure}</td>
                                                      </tr>
                                                      <tr>
                                                            <td>Humidity</td>
                                                            <td>{this.state.weatherData.main.humidity}</td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </div>
                              </div>
                        }
                  </div>

            );
      }

}

export default Home;