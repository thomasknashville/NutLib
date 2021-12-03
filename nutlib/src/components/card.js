import { useState } from "react";

const Card = ({ vid }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <div className="card" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
      {!isShown && (
        <video className="video" controls>
          <source src={vid.thumbnail} type="video/mp4" />
        </video>
      )}

      {isShown && (
        <>
          <video className="video" controls autoPlay={true} loop>
            <source src={vid.thumbnail} type="video/mp4" />
          </video>
          <div className="info-box">
            <p>{vid.title}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
