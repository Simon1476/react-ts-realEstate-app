import Slider from "../../components/Slider/Slider";
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
import SinglePageMap from "../../components/SinglePageMap/SinglePageMap";
import { useLoaderData } from "react-router-dom";
import { GetSinglePost } from "../../types/loaders/post";
import DOMPurify from "dompurify";
const SinglePage = () => {
  const post = useLoaderData() as GetSinglePost;

  console.log(post);
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <FontAwesomeIcon className="icon" icon={faLocationDot} />
                  <span>{post.address}</span>
                </div>
                <div className="price">
                  <FontAwesomeIcon className="icon" icon={faSackDollar} />
                  <span>{post.price}</span>
                </div>
              </div>
              <div className="user">
                {post.user.avatar && <img src={post.user.avatar[0]} alt="" />}
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc),
              }}
            ></div>
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
                {post.postDetail?.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faPaw} />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail?.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faHandHoldingDollar} />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail?.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="roomSizes">
            <div className="size">
              <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
              <span>{post.postDetail?.size} sqft</span>
            </div>
            <div className="size">
              <FontAwesomeIcon icon={faBed} />
              <span>{post.bathroom} bathroom</span>
            </div>
            <div className="size">
              <FontAwesomeIcon icon={faBath} />
              <span>{post.bedroom} bedroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="places">
            <div className="place">
              <FontAwesomeIcon icon={faSchool} />
              <div className="placeText">
                <span>School</span>
                <p>{post.postDetail?.school} m away</p>
              </div>
            </div>
            <div className="place">
              <FontAwesomeIcon icon={faBus} />
              <div className="placeText">
                <span>Bus Stop</span>
                <p>{post.postDetail?.bus} m away</p>
              </div>
            </div>
            <div className="place">
              <FontAwesomeIcon icon={faUtensils} />
              <div className="placeText">
                <span>Restaurant</span>
                <p>{post.postDetail?.restaurant} m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <SinglePageMap data={post} />
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
