import SearchBar from "../../components/SearchBar/SearchBar";
import "./homePage.scss";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Journey To Your Perfect Home</h1>
          <p>We'll help you find the perfect home to change your life</p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experiencve</h2>
            </div>
            <div className="box">
              <h1>150+</h1>
              <h2>Award Winning</h2>
            </div>
            <div className="box">
              <h1>25+</h1>
              <h2>Property Collections</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg3.png" alt="" />
      </div>
    </div>
  );
};

export default HomePage;
