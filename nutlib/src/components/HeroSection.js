import { useState, useEffect } from "react";

const HeroSection = () => {
  const [vids, setVids] = useState(null);
  const pageState = null;

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getMeetingVids", {
      method: "POST",
      body: JSON.stringify({ genre: "Sci-Fi", pageState: pageState }),
    });
    const responseBody = await response.json();
    console.log(responseBody.data.movies_by_genre.values);
    const movies = responseBody.data.movies_by_genre.values;
    // highlight a random selection from given genre(above)
    setVids(movies[Math.floor(Math.random() * movies.length)]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {vids && (
        <div className="hero">
          <video className="hero-video" muted controls autoPlay={true} loop>
            <source src={vids.thumbnail} tyoe="vide/mp4" />
          </video>
          <div className="info">
            <h3 className="hero-blurb">{vids.synopsis}</h3>
            <div className="button-section">
              <div className="button-play">
                <span>
                  <i className="fas fa-play"></i>
                </span>
                Play
              </div>
              <div className="button-more">
                <span>
                  <i className="fas fa-info-circle"></i>
                </span>
                More Info
              </div>
            </div>
          </div>
          section
        </div>
      )}
    </>
  );
};

export default HeroSection;
// query {
//     movies_by_genre (
//         value: { genre:"Sci-Fi" }
//         orderBy: [year_DESC]
//       	options: {pageSize: 2, pageState: "AA4ABAAAB+IHVXBncmFkZfB////98H////0="}
//     ){
//         values {
//           year,
//           title,
//           duration,
//           synopsis,
//           thumbnail
//         }
//     pageState
//     }
// }
