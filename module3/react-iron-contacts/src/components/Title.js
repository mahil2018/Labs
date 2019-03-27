import React from 'react';

const title = (props) => {
    // props is an object and to access its properties we have
    // to use dot notation
    // console.log('props: ', props);
    return (
        <div>{ props.message }</div>
    )

}

export default title;