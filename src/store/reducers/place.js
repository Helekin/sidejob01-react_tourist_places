import {
  PLACES_LIST_REQUEST,
  PLACES_LIST_SUCCESS,
  PLACES_LIST_FAIL,
  PLACE_CREATE_REQUEST,
  PLACE_CREATE_SUCCESS,
  PLACE_CREATE_FAIL,
  PLACE_CREATE_RESET,
} from "../../constants/place";

export const placesListReducer = (state = { places: [] }, action) => {
  switch (action.type) {
    case PLACES_LIST_REQUEST:
      return { loading: true, places: [] };
    case PLACES_LIST_SUCCESS:
      return {
        loading: false,
        places: action.payload.places,
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalDocuments: action.payload.totalDocuments,
      };
    case PLACES_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const placeCreateReducer = (state = { place: {} }, action) => {
  switch (action.type) {
    case PLACE_CREATE_REQUEST:
      return { loading: true };
    case PLACE_CREATE_SUCCESS:
      return { loading: false, success: true, place: action.payload };
    case PLACE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PLACE_CREATE_RESET:
      return { place: {} };
    default:
      return state;
  }
};
