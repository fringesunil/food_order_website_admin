import React from 'react';

function CouponCard(props) {
    const { coupon} = props;
    const expDate = new Date(coupon.exp_date);
    const formattedDate = expDate.toLocaleDateString('en-GB'); 
    return (
        <article >
        <div className='w-[16rem] h-fit bg-[#D9D9D9] border-2-white rounded-lg mx-2.5 px-1'>
        <h2>Coupon Code : {coupon.coupon_code}</h2>
        <h2>Percentage : {coupon.discount_percentage}</h2>
          <h2>Exp date : {formattedDate}</h2>

        </div>
      </article>
    );
}

export default CouponCard;