import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 3,
}) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Điều chỉnh khi gần đầu/cuối
    if (currentPage <= half) {
      end = Math.min(totalPages, maxVisible);
    } else if (currentPage + half >= totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={styles.pageBtn}
      >
        Prev Page
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={currentPage === p}
            className={`${styles.pageBtn} ${
              currentPage === p ? styles.active : ""
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={styles.pageBtn}
      >
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
