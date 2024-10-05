import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"


export default function EditHotelForm(props) {
    const hotel = props.hotels;
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit = (data) =>{
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]); 
    }
    try {
      const response =  axios.patch(`${import.meta.env.VITE_BASE_URL}/restaurants/${hotel._id}`, formData,);

      console.log(response.data); 
      navigate("/home/hotels");
    } catch (error) {
      console.error("Error updating menu:", error); 
    }
  }
   

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="mb-2 px-36 py-2">
            <label htmlFor="name" className="block text-black text-sm font-bold mb-2">Name</label>
            <input defaultValue={hotel.name} type="name" id="name" {...register("name",)} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="location" className="block text-black text-sm font-bold mb-2">Location</label>
            <input defaultValue={hotel.location} type="location" id="location" {...register("location", )} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>
          <div className="mb-2 px-36 py-2">
            <label htmlFor="image" className="block text-black text-sm font-bold mb-2">Image</label>
            <input type="file" id="image" {...register("image",)} className="shadow appearance-none border rounded w-[70rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
          </div>

          <div className="flex items-center justify-between py-2 px-36">
         <input className="w-[70rem] bg-blue-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value={"Save"}/>
            </div>
    </form>
  )
}