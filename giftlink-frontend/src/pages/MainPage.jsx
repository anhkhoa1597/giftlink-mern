import styles from "./MainPage.module.css";
import useGifts from "../hooks/useGifts";

const MainPage = () => {
  const { gifts, loading, error } = useGifts();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={styles.container}>
      {gifts.map((gift) => {
        return (
          <div key={gift.id} className={styles.card}>
            <img src={`${gift.image}`} alt={gift.name}></img>
            <h2>{gift.name}</h2>
            <p>{gift.condition}</p>
            <p>{gift.date_added}</p>
            <button>View Details</button>
          </div>
        );
      })}
    </div>
  );
};

export default MainPage;
