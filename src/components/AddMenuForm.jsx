import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"


export default function AddMenuForm(props) {
    console.log(`HOTEL ID8888=======>${props.hotelid}`)
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) =>{
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("restaurant_id", props.hotelid)
    if (data.image[0]) {
      formData.append("image", data.image[0])
    }
    axios.post(`http://localhost:3000/menu`,formData).then(response=>{
        alert('Item added Sucessfully');
       navigate(`/home/hotels`)
      }).catch(error=>console.log(error))
  }
   

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="mb-2 px-36 py-2">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Item Name</label>
            <input type="name" id="name" {...register("name", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="price" className="block text-black text-sm font-bold mb-2">Price</label>
            <input type="price" id="price" {...register("price", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="image" className="block text-black text-sm font-bold mb-2">Image</label>
            <input type="file" id="image" {...register("image", { required: true })} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>

          <div className="flex items-center justify-between py-2 px-36">
         <input className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value={"Save"}/>
            </div>
    </form>
  )
}