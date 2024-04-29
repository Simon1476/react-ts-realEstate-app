import { useState } from "react";
import "./chat.scss";

const Chat = () => {
  const [chat, setChat] = useState(true);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
        <div className="message">
          <img
            src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
            alt=""
          />
          <span>Simon Kim</span>
          <p>Lorem ipsum dolor ue?</p>
        </div>
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src="https://cdn.pixabay.com/photo/2024/03/14/08/52/pug-8632718_1280.jpg"
                alt=""
              />
              Simon Kim
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
