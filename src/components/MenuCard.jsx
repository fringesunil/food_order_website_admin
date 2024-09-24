import React, { useState } from 'react';

function MenuCard(props) {
  const userId = localStorage.getItem('userId');
  const { menu} = props;
  const [count, setCount] = useState(0);

  return (
    
    <article>
      <div className='w-[16rem] h-fit bg-transparent border border-black rounded-lg mx-4 px-3 py-1'>
        <img src={menu.image} alt="Menu image" className='w-[20rem] h-[09rem] rounded-lg' />
        <div className='flex flex-row justify-between pb-2'>
          <h2>{menu.name}</h2>
          <span>₹ {menu.price}</span>
        </div>
       
      </div>
    </article>
  );
}

export default MenuCard;
