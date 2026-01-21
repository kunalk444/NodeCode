import React, { useEffect } from 'react'
import { apiCallFunction } from '../helpers/apiHelper';

function Problems() {
    useEffect(()=>{
       (async()=>{
            const res = await apiCallFunction("viewproblems/",null,"GET"); 
            console.log(res);
       })(); 
    },[]);
    return (
        <div>Problems</div>
    )
}

export default Problems;