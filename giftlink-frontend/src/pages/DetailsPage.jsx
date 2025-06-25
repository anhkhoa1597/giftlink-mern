import styles from "./DetailsPage.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftById } from "../features/gift/giftSlice";
import { Link } from "react-router-dom";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gift, status, error } = useSelector((state) => state.gift);

  useEffect(() => {
    if (id) dispatch(fetchGiftById(id));
  }, [id, dispatch]);

  if (status === "loading")
    return <p className={styles.message}>Loading Gift Detail...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;
  if (!gift) return null;

  const handleImageError = (e) => {
    e.target.src = "/images/no-image.png";
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>{gift.name}</h2>
        <div className={styles.card_body}>
          <img
            className={styles.image}
            src={gift.image}
            alt={gift.name}
            onError={handleImageError}
          />
          <p>
            <strong>Category:</strong>
            {gift.category}
          </p>
          <p>
            <strong>Condition:</strong>
            {gift.condition}
          </p>
          <p>
            <strong>Date Added:</strong>
            {new Date(gift.date_added * 1000).toLocaleDateString("default", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Age (Years):</strong>
            {gift.age_years}
          </p>
          <p>
            <strong>Description:</strong>
            {gift.description}
          </p>
        </div>
      </div>
      <div>
        <h3>Comments</h3>
        {}
      </div>
    </div>
  );
};

export default DetailsPage;
