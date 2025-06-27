import styles from "./DetailsPage.module.css";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGiftById } from "../../features/gift/giftSlice";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { gift, status, error } = useSelector((state) => state.gift);
  const comments = [
    {
      author: "John Doe",
      comment: "I would like this!",
    },
    {
      author: "Jane Smith",
      comment: "Just DMed you.",
    },
    {
      author: "Alice Johnson",
      comment: "I will take it if it's still available.",
    },
    {
      author: "Mike Brown",
      comment: "This is a good one!",
    },
    {
      author: "Sarah Wilson",
      comment:
        "My family can use one. DM me if it is still available. Thank you!",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) dispatch(fetchGiftById(id));
  }, [id, dispatch]);

  if (status === "loading")
    return <p className={styles.message}>Loading Gift Detail...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;
  if (!gift) return null;

  const handleImageError = (e) => {
    e.target.onError = null;
    e.target.src = "/images/no-image.png";
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <Link to="/main" className={styles.backBtn}>
            Return
          </Link>
          <img
            className={styles.image}
            src={gift.image}
            alt={gift.name}
            onError={handleImageError}
          />
        </div>
        <div className={styles.details}>
          <h2 className={styles.title}>{gift.name}</h2>
          <p>
            <strong>Category:</strong> {gift.category}
          </p>
          <p>
            <strong>Condition:</strong> {gift.condition}
          </p>
          <p>
            <strong>Date Added:</strong>{" "}
            {new Date(gift.date_added * 1000).toLocaleDateString("default", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Age (Years):</strong> {gift.age_years}
          </p>
          <p>
            <strong>Description:</strong> {gift.description}
          </p>
        </div>
      </div>

      <div className={styles.commentSection}>
        <h3>Comments</h3>
        {comments.map((e, index) => {
          return (
            <div key={index} className={styles.comment}>
              <p className={styles.author}>
                <strong>{e.author}</strong>
              </p>
              <p className={styles.text}>{e.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailsPage;
