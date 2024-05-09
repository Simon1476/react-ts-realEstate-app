import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price as string),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom as string),
          bathroom: parseInt(inputs.bathroom as string),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size as string),
          school: parseInt(inputs.school as string),
          bus: parseInt(inputs.bus as string),
          restaurant: parseInt(inputs.restaurant as string),
        },
      });
      navigate("/" + res.data.id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" />
            </div>
            <div className="input-group">
              <label htmlFor="price">Price</label>
              <input type="number" id="price" name="price" />
            </div>
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" />
            </div>
            <div className="input-group description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="input-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" />
            </div>
            <div className="input-group">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input type="number" id="bedroom" name="bedroom" min={1} />
            </div>
            <div className="input-group">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input type="number" id="bathroom" name="bathroom" min={1} />
            </div>
            <div className="input-group">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="input-group">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="property">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="input-group">
              <label htmlFor="size">Total Size (sqft)</label>
              <input type="number" min={0} id="size" name="size" />
            </div>
            <div className="input-group">
              <label htmlFor="school">School</label>
              <input type="number" min={0} id="school" name="school" />
            </div>
            <div className="input-group">
              <label htmlFor="bus">bus</label>
              <input type="number" min={0} id="bus" name="bus" />
            </div>
            <div className="input-group">
              <label htmlFor="restaurant">Restaurant</label>
              <input type="number" min={0} id="restaurant" name="restaurant" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
      </div>
    </div>
  );
};

export default NewPostPage;
