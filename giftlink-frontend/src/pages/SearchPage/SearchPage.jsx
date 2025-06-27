import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SearchPage.module.css";
import Pagination from "../../components/Pagination";
import { fetchSearchGifts } from "../../features/search/searchSlice";
import GiftCard from "../../components/GiftCard";

const categories = ["Living", "Bedroom", "Bathroom", "Kitchen", "Office"];
const conditions = ["New", "Like New", "Older"];

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
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <fieldset>
          <legend>Filters</legend>

          {/* Category dropdown */}
          <label htmlFor="category">
            Category
            <select
              name="category"
              id="category"
              className={styles.textInp}
              value={filters.category}
              onChange={handleChange}
            >
              <option value="">-- Select category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>

          {/* Condition dropdown */}
          <label htmlFor="condition">
            Condition
            <select
              name="condition"
              id="condition"
              className={styles.textInp}
              value={filters.condition}
              onChange={handleChange}
            >
              <option value="">-- Select condition --</option>
              {conditions.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
          </label>

          {/* Age range */}
          <label htmlFor="age_years">
            Less than {filters.age_years} years
            <input
              type="range"
              name="age_years"
              id="age_years"
              min="0"
              max="20"
              className={styles.rangeInp}
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
              className={styles.textInp}
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
        {status === "loading" && <p className={styles.loading}>Loading...</p>}
        {status === "failed" && <p className={styles.error}>{error.message}</p>}
        {status === "succeeded" && searchGifts.length === 0 && (
          <p className={styles.error}>No gifts found.</p>
        )}
        {status === "succeeded" &&
          searchGifts.map((gift) => <GiftCard gift={gift} key={gift.id} />)}
      </div>
      {status === "succeeded" && searchGifts.length > 0 && (
        <div className={styles.paginationWrapper}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
