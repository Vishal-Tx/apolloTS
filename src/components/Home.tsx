import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const FETCH_ALL_COUNTRY_NAME = gql`
  {
    countries {
      code
      name
      emoji
      capital
    }
  }
`;

const Home = () => {
  const { data, error, loading } = useQuery(FETCH_ALL_COUNTRY_NAME);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const navigate = useNavigate();
  // console.log(data);

  const filteredCountry = data?.countries.filter(
    (country: { name: string }) => {
      const regex = new RegExp(localSearchTerm, "i");
      return regex.test(country.name);
    }
  );
  const handleLocalSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleClick = (code: any) => {
    navigate(`/${code}`);
  };
  return (
    <div className="home">
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>"error"</h1>
      ) : (
        <>
          <div className="navbar">
            <h1>List of Countries</h1>
          </div>

          <Link to="/search">Search</Link>
          <input type="text" onChange={handleLocalSearch} />
          {filteredCountry.length === 0 && (
            <h2>No Such Country. Please try again!</h2>
          )}
          {filteredCountry.map(
            (country: {
              code: string;
              name: string;
              emoji: string;
              capital: string;
            }) => (
              <div
                className="country-item"
                key={country.code}
                onClick={() => handleClick(country.code)}
              >
                <h2>
                  {country.name} {country.emoji}
                </h2>
                <h4>{country.capital}</h4>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Home;
