import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function MenuCard(props) {
  const navigate = useNavigate();
  const { menu } = props;

  const handleDelete = async (menuId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this hotel?");
  
    if (isConfirmed) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/menu/${menuId}`);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting the menu:', error);
    }
  }
  };

  const handleEdit = (menuId) => {
    navigate(`/home/menu/edit/${menuId}`);
};

  return (
    <article>
      <div className="w-[16rem] h-[20rem] bg-transparent border border-black rounded-lg mx-4 px-3 py-1 flex flex-col justify-between">
        <img src={menu.image} alt="Menu image" className="w-full h-[9rem] rounded-lg object-cover" />
        <div className="flex flex-row justify-between py-2">
          <h2 className="w-[10rem] break-words">{menu.name}</h2>
          <span>₹ {menu.price}</span>
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white p-2 rounded w-[7rem] text-center"
            onClick={() => handleDelete(menu._id)}
          >
            Delete
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded w-[7rem] text-center ml-2"
            onClick={() => handleEdit(menu._id)}
          >
            Edit
          </button>
        </div>
      </div>
    </article>
  );
}
