import styles from "./MainPage.module.css";
import useGifts from "../hooks/useGifts";
import { useState } from "react";
import { Link } from "react-router-dom";

const GIFTS_PER_PAGE = 8;

const MainPage = () => {
  const { gifts, loading, error } = useGifts();
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <p className={styles.message}>Loading gifts...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  const totalPages = Math.ceil(gifts.length / GIFTS_PER_PAGE);
  const start = (currentPage - 1) * GIFTS_PER_PAGE;
  const currentGifts = gifts.slice(start, start + GIFTS_PER_PAGE);

  const handleImageError = (e) => {
    e.target.src = "/images/no-image.png";
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {currentGifts.map((gift) => (
          <div key={gift.id} className={styles.card}>
            <img
              className={styles.image}
              src={gift.image}
              alt={gift.name}
              onError={handleImageError}
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
        ))}
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`${styles.pageBtn} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
