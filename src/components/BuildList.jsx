import React from 'react';

export default function BuildList({ items = [] }) {
  return (
    <ul className='buildUl'>
      {items.map(item => (
        <li key={item.id}>
          <img src={item.imgUrl} alt={item.name} />
          <span title={item.name}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}