import React from 'react';

const list=(props)=>(
    <ul >
      {
         props.items.map(function(item) {
          return <li  data-category={item} key={item}>{item}</li>
        })
       }
      </ul>
)

export default list;