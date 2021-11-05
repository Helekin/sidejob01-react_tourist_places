import axios from "axios";

import { baseURL } from "../../constants/baseURL";
import {
  PLACES_LIST_REQUEST,
  PLACES_LIST_SUCCESS,
  PLACES_LIST_FAIL,
} from "../../constants/place";

export const getPlacesList = (pageNumber, pageSize) => async (dispatch) => {
  try {
    dispatch({ type: PLACES_LIST_REQUEST });

    const { data } = await axios.get(
      `${baseURL}/api/places?pagenumber=${pageNumber}&pagesize=${pageSize}`
    );

    dispatch({ type: PLACES_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
