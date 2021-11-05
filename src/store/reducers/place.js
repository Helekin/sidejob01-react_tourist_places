import {
  PLACES_LIST_REQUEST,
  PLACES_LIST_SUCCESS,
  PLACES_LIST_FAIL,
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
