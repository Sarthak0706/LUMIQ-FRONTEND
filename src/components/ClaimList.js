import { useEffect, useState } from "react";
import { getClaims } from "../api";

const ClaimList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await getClaims();
        setClaims(response.data);
      } catch (error) {
        console.error("Error fetching claims", error);
      }
    };
    fetchClaims();
  }, []);

  return (
    <div>
      <h2>Claims List</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim._id}>
            {claim.description} - {claim.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimList;
