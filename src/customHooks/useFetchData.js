import * as React from "react";
import { dataReducer } from "./reducers/dataReducer";
import {
  fetchTextIntroData,
  fetchTextIntroImage,
} from "../customHooks/actions/fetchDataAction";

const useFetchData = () => {
  const initialState = {
    data: null,
    error: null,
    status: "idle",
  };

  const [state, dispatch] = React.useReducer(dataReducer, initialState);

  const { data, error, status } = state;

  const execute = React.useCallback((promise) => {
    dispatch({ type: "fetching" });
    promise
      .then((data) => dispatch({ type: "done", payload: data }))
      .catch((error) => dispatch({ type: "fail", error }));
  }, []);

  return { data, error, status, execute };
};

export const useFindTextIntro = () => {
  const { data, error, status, execute } = useFetchData();
  React.useEffect(() => {
    execute(fetchTextIntroData());
  }, [execute]);

  return { data, error, status };
};

export const useFindTextIntroImage = (imageId) => {
  const { data, error, status, execute } = useFetchData();
  React.useEffect(() => {
    execute(fetchTextIntroImage(imageId));
  }, [execute, imageId]);

  return { data, error, status };
};
