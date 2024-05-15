import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import apiRequest from "../../lib/apiRequest";

import "./profileUpdatePage.scss";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState<string[]>([]);

  const navigate = useNavigate();

  // const handleUploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   if (file) {
  //     formData.append("image", file);
  //   }

  //   formData.append("caption", caption);

  //   await apiRequest.post(`/users/img/${currentUser.id}`, formData, {
  //     headers: { "Content-Type": "multipart/form-data" },
  //   });
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = e.target.files?.[0];
  //   if (selectedFile) {
  //     setFile(selectedFile);
  //   } else {
  //     // Handle the case where no file is selected (optional)
  //     console.log("No file selected");
  //   }
  // };

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
        avatar: avatar[0],
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      }
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdateUser}>
          <h1>Update Profile</h1>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>error</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || "/noavatar.jpg"}
          alt="Avatar image"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            multiple: false,
            cloudName: "dtw7eohm1",
            uploadPreset: "estate",
            folder: "avatats",
            maxImageFileSize: 2000000,
          }}
          setAvatar={setAvatar}
        />
        {/* <form onSubmit={handleUploadImage}>
          <input
            onChange={handleFileChange}
            type="file"
            name="image"
            accept="image/*"
          ></input>
          <input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            type="text"
            name="caption"
            placeholder="Caption"
          ></input>
          <button type="submit">Submit</button>
        </form> */}
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
