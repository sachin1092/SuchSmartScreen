import React from 'react';

//import 'root/style.css';
import Nest from 'nest';
import { CookiesProvider } from 'react-cookie';

export default class extends React.Component {
    render() {
        return (
            <CookiesProvider>
            <div id="root">
                <div>
                    <div id="nest">
                        <Nest />
                    </div>
                </div>
            </div>
            </CookiesProvider>
        )
    }
}
