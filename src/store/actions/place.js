import axios from "axios";

import { baseURL } from "../../constants/baseURL";
import {
  PLACES_LIST_REQUEST,
  PLACES_LIST_SUCCESS,
  PLACES_LIST_FAIL,
  PLACE_CREATE_REQUEST,
  PLACE_CREATE_SUCCESS,
  PLACE_CREATE_FAIL,
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

export const createPlace = (place) => async (dispatch, getState) => {
  try {
    dispatch({ type: PLACE_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`${baseURL}/api/places`, place, config);

    dispatch({ type: PLACE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLACE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
