import React, { Component } from 'react';
import dotcmsApi from '../../dotcmsApi';

export default class Banner extends Component {
    state = {
        widgetCode:'test'
    };

    componentDidMount() {
        dotcmsApi.httpClient.request({
            url: `${process.env.REACT_APP_DOTCMS_HOST}/api/content/id/` + this.props.identifier
        })
        .then(response =>  response.json())
        .then(jsonBody => {
            this.setState({
                ...this.state,
                responseJson: jsonBody.contentlets[0],
                widgetCode:jsonBody.contentlets[0].caption1
            });
            console.log(this.state.responseJson)

        })
    }
    render() {

        const divStyle = {
            backgroundColor: '40px',
            border: '5px solid white',
            backgroundImage: `url('/dA/${this.props.identifier}/image/1200h/jpegp/banner.jpeg)`,
            height: "400px",
            marginTop:`-150px`,
            backgroundSize:"cover"
          };

          

        return (
            <div className="bg-wrapper" style={divStyle}>
                <div className="container">
                    <div >
                        <div style={{ marginTop: `30px`,width:`50%`,marginLeft:`auto`,marginRight:`auto`}}>
                            <div style={{  background: `rgba(255,255,255,.6)`, textAlign:"center",padding:'10px',marginLeft:`auto`,marginRight:`auto` }} dangerouslySetInnerHTML={{ __html: this.state.widgetCode }} />

                        </div>
                    </div>
                </div>

            </div>

 
                

        );
    }
}