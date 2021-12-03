import { useEffect, useState } from "react";
import Card from "./card";

const Section = ({ genre }) => {
  const [vids, setVids] = useState(null);
  const [pageState, setPageState] = useState(null);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMeetingVids", {
      method: "POST",
      body: JSON.stringify({ genre: genre, pageState: pageState }),
    });
    const responseBody = await response.json();
    console.log(responseBody.data.movies_by_genre.values);
    setVids(responseBody.data.movies_by_genre.values);
    setPageState(responseBody.data.movies_by_genre.pageState);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h2 id={genre}>{genre}</h2>;
      {vids && (
        <div className="vids-section">
          {vids.map((vid, index) => (
            <Card key={index} vid={vid} />
          ))}
          <div
            className="more-button"
            onClick={() => {
              setPageState(pageState);
              fetchData();
            }}
          >
            <i className="fas <fa-angle-right"></i>
          </div>
        </div>
      )}
    </>
  );
};

export default Section;
