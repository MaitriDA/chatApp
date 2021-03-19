import React from 'react';
import fire from '../../helper/db';
import ContactList from './ContactList';
import ChatArea from './ChatArea';
import './MainArea.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const MainArea=(props)=>{
    return(
       <div className="mainArea">
       <Router>
                <ContactList />
                <Switch>
                    <Route path="/contact/:contactEmail">
                        <ChatArea />
                    </Route>
                </Switch>
            </Router>
       </div>
    );

}
export default MainArea;