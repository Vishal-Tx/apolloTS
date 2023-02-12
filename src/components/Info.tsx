import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import "../App.css";

const FETCH_COUNTRY_DETAILS = gql`
  query Country($search: string!) {
    country(code: $search) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

const Info = () => {
  const { search } = useParams();
  const { data, loading, error } = useQuery(FETCH_COUNTRY_DETAILS);
  console.log(data);

  console.log("search", search);
  return (
    <div className="info">
      Info
      <Link to="/">Home</Link>
    </div>
  );
};

export default Info;
