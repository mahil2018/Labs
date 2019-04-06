import React, { Component, Fragment } from 'react';
import contacts from '../contacts';
import otherContacts from '../contacts';
import ContactCard from './ContactCard';
import CoolButton from './CoolButton';


class Contacts extends Component {
    state = {contacts: contacts.slice(0,5)}
    addRandomContact = () =>{
        const {contacts} = this.state
        const copyOfContacts = [...otherContacts]
        const rest = copyOfContacts.splice(5)
        const random = Math.floor(Math.random()*rest.length)
        // console.log(random)
        const newContact = rest[random]
        // use spread operator to populate all objects in the same level,
        // otherwise , it will have an array of contacts and an object
        this.setState({contacts: [...contacts, newContact]})
        debugger;
    }
    sortByName = () =>{
        const copyOfContacts = [...this.state.contacts];
        copyOfContacts.sort(function(a,b){
            var x = a.name.toLowerCase();
            var y = b.name.toLowerCase();
            if (x<y) {return -1;}
            if (x>y) {return 1;}
            return 0;
        })
        this.setState({contacts : copyOfContacts})
    }
    render(){
        const {contacts} = this.state;
        //debugger;
        return (
            <Fragment>
                <h1>IronContacts</h1>
                <CoolButton onClick={this.addRandomContact} isInfo isSmall>Add Random Contact</CoolButton>
                <CoolButton onClick={this.sortByName} isInfo isSmall>Sort By Name</CoolButton>
                <CoolButton onClick={this.sortByPopularity} isInfo isSmall>Sort By Popularity</CoolButton>
                <table>
                    <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Popularity</th>
                        </tr>
                        {
                            contacts.map((contact, index)=>
                                <ContactCard key={index} contact={contact}/>
                            )
                        }
                    </tbody>
                </table>
            </Fragment>
        );
    }

}


export default Contacts;