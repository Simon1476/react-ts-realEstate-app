import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";

import { singlePostData, userData } from "../../lib/dummydata";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faBookmark,
  faBus,
  faEnvelope,
  faHandHoldingDollar,
  faLocationDot,
  faPaw,
  faSackDollar,
  faSchool,
  faScrewdriverWrench,
  faUpRightAndDownLeftFromCenter,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import "./singlePage.scss";

const SinglePage = () => {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <FontAwesomeIcon className="icon" icon={faLocationDot} />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">
                  <FontAwesomeIcon className="icon" icon={faSackDollar} />
                  <span>{singlePostData.price}</span>
                </div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="rental-agreement">
            <div className="feature">
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              <div className="featureText">
                <span>Utilities</span>
                <p>Renter is responsible</p>
              </div>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faPaw} />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>Pets Allowed</p>
              </div>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faHandHoldingDollar} />
              <div className="featureText">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="roomSizes">
            <div className="size">
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
              <span>24m2</span>
            </div>
            <div className="size">
              <FontAwesomeIcon icon={faBed} />
              <span>2 bed</span>
            </div>
            <div className="size">
              <FontAwesomeIcon icon={faBath} />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="places">
            <div className="place">
              <FontAwesomeIcon icon={faSchool} />
              <div className="placeText">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="place">
              <FontAwesomeIcon icon={faBus} />
              <div className="placeText">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="place">
              <FontAwesomeIcon icon={faUtensils} />
              <div className="placeText">
                <span>Restaurant</span>
                <p>30m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            {/* <Map items={singlePostData}/> */}
          </div>
          <div className="buttons">
            <button>
              <FontAwesomeIcon icon={faEnvelope} />
              Send a Message
            </button>
            <button>
              <FontAwesomeIcon icon={faBookmark} />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
