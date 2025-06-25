import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../features/gift/giftSlice";
import config from "../config/config";

const useGifts = () => {
  const dispatch = useDispatch();
  const { gifts, status, error, page, totalPages } = useSelector(
    (state) => state.gift
  );
  useEffect(() => {
    if (status === "idle" || gifts.length === 0) {
      dispatch(fetchGifts({ page: 1, limit: config.giftsPerPage }));
    }
  }, [dispatch, status, gifts.length]);
  return { gifts, status, error, page, totalPages };
};

export default useGifts;
