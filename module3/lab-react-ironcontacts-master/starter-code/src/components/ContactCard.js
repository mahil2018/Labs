import React from 'react';

function ContactCard({contact})
{
    const {pictureUrl, name, popularity} = contact;
    return(
        <tr>
            <td><img src={pictureUrl} alt={name} /></td>
            <td>{name}</td>
            <td>{popularity.toFixed(2)}</td>
        </tr>
    )
}

export default ContactCard;