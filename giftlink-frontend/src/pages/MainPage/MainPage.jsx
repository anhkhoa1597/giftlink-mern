import styles from "./MainPage.module.css";
import { Link } from "react-router-dom";
import config from "../../config/config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../../features/gift/giftSlice";
import Pagination from "../../components/Pagination";
import GiftCard from "../../components/GiftCard";

const MainPage = () => {
  const dispatch = useDispatch();
  const { gifts, status, error, page, totalPages } = useSelector(
    (state) => state.gift
  );

  useEffect(() => {
      dispatch(fetchGifts({ page: 1, limit: config.giftsPerPage }));
  }, [dispatch]);

  if (status === "loading")
    return <p className={styles.message}>Loading gifts...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  const handlePageChange = (newPage) => {
    dispatch(fetchGifts({ page: newPage, limit: config.giftsPerPage }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {gifts.map((gift) => (
          <GiftCard key={gift.id} gift={gift} />
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
