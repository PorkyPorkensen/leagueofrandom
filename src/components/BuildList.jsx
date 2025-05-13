import React from 'react';

export default function BuildList({ items = [] }) {
  return (
    <ul className='buildUl'>
      {items.map(item => (
        <li key={item.id}>
          <img src={item.imgUrl} alt={item.name} />
          <h3>{item.name}</h3>
        </li>
      ))}
    </ul>
  );
}