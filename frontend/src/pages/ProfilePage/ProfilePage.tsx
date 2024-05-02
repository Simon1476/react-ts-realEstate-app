import Chat from "../../components/Chat/Chat";
import List from "../../components/List/List";
import "./profilePage.scss";

const ProfilePage = () => {
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:{" "}
              <img
                src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
                alt=""
              />
            </span>
            <span>
              Username: <b>Simon</b>
            </span>
            <span>
              E-mail: <b>04068k@naver.com</b>
            </span>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;