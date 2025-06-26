import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SearchPage.module.css";
import Pagination from "../components/Pagination";
import { fetchSearchGifts } from "../features/search/searchSlice";
import GiftCard from "../components/GiftCard";

const SearchPage = () => {
  const dispatch = useDispatch();
  const { searchGifts, status, error, totalPages, page } = useSelector(
    (state) => state.search
  );

  const [filters, setFilters] = useState({
    category: "",
    condition: "",
    age_years: 0,
    name: "",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("searching...");
    dispatch(
      fetchSearchGifts({
        query: { ...filters },
        page: 1,
      })
    );
  };

  const handlePageChange = (newPage) => {
    dispatch(
      fetchSearchGifts({
        query: { ...filters },
        page: newPage,
      })
    );
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleSearch(e)}>
        <fieldset>
          <legend>Filters</legend>
          <label htmlFor="category">
            Category
            <input
              type="text"
              name="category"
              id="category"
              placeholder="e.g. book, toy"
              value={filters.category}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="condition">
            Condition
            <input
              type="text"
              name="condition"
              id="condition"
              placeholder="e.g. new, used"
              value={filters.condition}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="age_years">
            Less than {filters.age_years} years
            <input
              type="range"
              name="age_years"
              id="age_years"
              min="0"
              max="20"
              value={filters.age_years}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <fieldset>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Search for items..."
              value={filters.name}
              onChange={handleChange}
            />
          </label>
        </fieldset>

        <button className={styles.searchBtn} type="submit">
          Search
        </button>
      </form>

      <div className={styles.result}>
        {status === "loading" && (
          <p className={styles.loading}>Loading...</p>
        )}
        {status === "failed" && <p className={styles.error}>{error.message}</p>}
        {status === "succeeded" && searchGifts.length === 0 && (
          <p className={styles.error}>No gifts found.</p>
        )}
        {status === "succeeded" &&
          searchGifts.map((gift) => (
            <GiftCard
                gift={gift}
                key={gift.id}
            />
          ))}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SearchPage;
