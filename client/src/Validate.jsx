import React from 'react'

const Validate = ({username,password}) => {
    return new Promise((resolve, reject) => {
        if(!username) return reject("Username must be provided");
        if(!password) return reject("Password must be provided");
        if(typeof username !== "string"){reject("Username must String")};

        if(typeof password !== "string"){reject("Password must String")};

        resolve();

    })
}

export default Validate