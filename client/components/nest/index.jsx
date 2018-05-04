import React, {Component} from 'react';
import { withCookies, Cookies } from 'react-cookie';

class Nest extends Component {

    constructor() {
        super();
        this.state = {
            text: "hello nest!!"
        };
    }

    componentDidMount() {
        let NEST_API_URL = 'https://developer-api.nest.com';

        if (!window.EventSource) {
            alert('Your browser does not support EventSource. Try another browser.');
            throw new Error('Your browser does not support EventSource.');
        }

        let token = Cookies.get('nest_token');
        console.log(token);


    }

    render() {
        return (
            <div>
                {this.state.text}
            </div>
        )
    }
}

export default withCookies(Nest);
