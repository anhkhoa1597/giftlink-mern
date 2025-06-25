const config = {
  baseUrl: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  pages: {
    giftsPerPage: import.meta.env.VITE_GIFTS_PER_PAGE || "12",
    maxVisible: import.meta.env.VITE_MAX_VISIBLE || "5",
  },
};

export default config;
