import "./App.css";
import { useEffect, useState } from "react";
import Section from "./components/Section";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

const App = () => {
  const topicIncrement = 4;
  const [genres, setGenres] = useState(null);
  const [limit, setLimit] = useState(topicIncrement);

  const fetchData = async () => {
    const response = await fetch("/.netlify/functions/getTopics", {
      method: "POST",
      body: limit,
    });
    const responseBody = await response.json();
    console.log(responseBody);
    setGenres(responseBody.data.reference_list.values);
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <>
      <NavBar />
      <HeroSection />
      {genres && (
        <div className="container">
          {Object.values(genres).map((genre, index) => (
            <Section genre={genre.value} />
          ))}
        </div>
      )}
      <div
        className="page-end"
        onMouseEnter={() => {
          setLimit(limit + topicIncrement);
        }}
      />
    </>
  );
};

export default App;
