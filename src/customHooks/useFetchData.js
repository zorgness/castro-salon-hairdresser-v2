import * as React from "react";
import { dataReducer } from "./reducers/dataReducer";
import {
  fetchTextIntro,
  fetchTextIntroImage,
  fetchGalleriesData,
  fetchGalleryImages,
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

export const useFetchTextIntro = () => {
  const { data, error, status, execute } = useFetchData();

  React.useEffect(() => {
    execute(fetchTextIntro());
  }, [execute]);

  return { data, error, status };
};

export const useFetchTextIntroImage = (imageId) => {
  const { data, error, status, execute } = useFetchData();
  React.useEffect(() => {
    execute(fetchTextIntroImage(imageId));
  }, [execute, imageId]);

  return { data, error, status };
};

export const useFetchGalleries = () => {
  const { data, error, status, execute } = useFetchData();
  React.useEffect(() => {
    execute(fetchGalleriesData());
  }, [execute]);

  return { data, error, status };
};

export const useFetchGalleryImages = (galleryId) => {
  const { data, error, status, execute } = useFetchData();
  React.useEffect(() => {
    execute(fetchGalleryImages(galleryId));
  }, [execute, galleryId]);

  return { data, error, status };
};
