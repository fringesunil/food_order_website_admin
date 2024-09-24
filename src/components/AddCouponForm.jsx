import axios from "axios";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


export default function AddCouponForm() {
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) => {
    const formattedData = {
        ...data,
        discount_percentage: parseInt(data.discount_percentage, 10),
      };
      axios.post(`http://localhost:3000/coupon`,formattedData).then(response=>{
        navigate(`/home/coupons`)
      }).catch(error=>console.log(error))
  }


  console.log(watch("example")) // watch input value by passing the name of it


  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2 px-36 py-2">
            <label htmlFor="Code" className="block text-black text-sm font-bold mb-2">Coupon Code</label>
            <input type="Code" id="Code" {...register("coupon_code", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="percentage" className="block text-black text-sm font-bold mb-2">Discount Percentage</label>
            <input type="number" id="percentage" {...register("discount_percentage", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="date" className="block text-black text-sm font-bold mb-2">Exp Date</label>
            <input type="Date" id="date" {...register("exp_date", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>

          <div className="flex items-center justify-between py-2 px-36">
         <input className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value={"Save"}/>
            </div>


    
    </form>
  )
}