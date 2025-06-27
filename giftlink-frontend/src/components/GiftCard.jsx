import styles from "./GiftCard.module.css";
import { Link } from "react-router-dom";
import React from "react";

const GiftCard = ({ gift }) => {
  const handleImageError = (e) => {
    e.target.onError = null;
    e.target.src = "/images/no-image.png";
  };
  return (
    <div key={gift.id} className={styles.card}>
      <img
        className={styles.image}
        src={gift.image}
        alt={gift.name}
        onError={handleImageError}
        loading="lazy"
      />
      <h2>{gift.name}</h2>
      <p
        className={`${styles.condition} ${
          styles[gift.condition.replace(/\s/g, "").toLowerCase()]
        }`}
      >
        {gift.condition}
      </p>
      <p>
        {new Date(gift.date_added * 1000).toLocaleDateString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <Link to={`/details/${gift.id}`} className={styles.btn}>
        View Details
      </Link>
    </div>
  );
};

export default React.memo(GiftCard);
