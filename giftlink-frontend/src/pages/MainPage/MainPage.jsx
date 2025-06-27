import styles from "./MainPage.module.css";
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
    if (gifts.length === 0 && status !== "loading") {
      dispatch(fetchGifts({ page: 1, limit: config.giftsPerPage }));
    }
  }, [dispatch, gifts.length, status]);

  if (status === "loading")
    return <p className={styles.message}>Loading gifts...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;

  const handlePageChange = (newPage) => {
    dispatch(fetchGifts({ page: newPage, limit: config.giftsPerPage }));
    window.scrollTo({ top: 0, behavior: "smooth" }); // 🆕
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
