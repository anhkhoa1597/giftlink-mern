import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGifts } from "../features/gift/giftSlice";

const useGifts = () => {
  const dispatch = useDispatch();
  const { gifts, loading, error } = useSelector((state) => state.gift);
  useEffect(() => {
    dispatch(fetchGifts());
  }, [dispatch]);
  return { gifts, loading, error };
};

export default useGifts;
