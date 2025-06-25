import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";
import config from "../config/config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../features/gift/giftSlice";
import Pagination from "../components/Pagination";

const MainPage = () => {
  const dispatch = useDispatch();
  const { gifts, status, error, page, totalPages } = useSelector(
    (state) => state.gift
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGifts({ page: 1, limit: config.giftsPerPage }));
    }
  }, [dispatch, status]);

  if (status === "loading")
    return <p className={styles.message}>Loading gifts...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  const handleImageError = (e) => {
    e.target.src = "/images/no-image.png";
  };

  const handlePageChange = (newPage) => {
    dispatch(fetchGifts({ page: newPage, limit: config.giftsPerPage }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {gifts.map((gift) => (
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
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => handlePageChange(newPage)}
      />
    </div>
  );
};

export default MainPage;
