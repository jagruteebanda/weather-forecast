import React, { Component } from 'react';

import axios from 'axios';
import $ from 'jquery';

import '../styles/Home.css';

class Home extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  formData: new FormData()
            }
      }

      render() {
            return (
                  <div>
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

                                          // axios.post('http://localhost:3002/storeImage', formData)
                                          //       .then(function (response) {
                                          //             console.log(response);
                                          //       })
                                          //       .catch(function (error) {
                                          //             alert(error);
                                          //       })
                                    }
                                    }>
                                    <input type="file" name="imageFile" id="imageFile" onChange={(e) => {
                                          // let formData = this.state.formData;
                                          // formData.append('image', e.target.files[0]);
                                          // this.setState({ formData }, () => {
                                          //       console.log(this.state.formData);
                                          // });
                                    }} />
                                    <input type="submit" />
                              </form>
                        </div>

                  </div>

            );
      }

}

export default Home;