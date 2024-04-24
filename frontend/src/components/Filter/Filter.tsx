import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./filter.scss";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Filter = () => {
  return (
    <div className="filter">
      <h1>
        Search results for <b>Tyokyo</b>
      </h1>
      <div className="top">
        <div className="input-group">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="input-group">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="Condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
          />
        </div>
        <div className="input-group">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="text" id="maxPrice" name="maxPrice" placeholder="Any" />
        </div>
        <div className="input-group">
          <label htmlFor="city">Bedroom</label>
          <input type="text" id="bedRoom" name="bedRoom" placeholder="Any" />
        </div>
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default Filter;
