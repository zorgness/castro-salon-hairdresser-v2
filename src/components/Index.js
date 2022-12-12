import React from "react";
import Banner from "./Banner";
import Brand from "./Brand";
import MyMap from "./Map";
import { useFetchTextIntro } from "./../customHooks/useFetchData";
import TextIntro from "./TextIntro";
import Loader from "../components/Loader";

const Index = () => {
  const state = useFetchTextIntro();
  const { data, status } = state;

  return (
    <div className="content-container">
      <Banner />

      {status === "fetching" && <Loader />}

      {status === "done" &&
        data?.map((textIntro, index) => {
          return (
            <TextIntro
              key={index}
              textIntro={textIntro}
              indexPosition={index}
            />
          );
        })}

      <div className="index-item3">
        <Brand />
      </div>

      <div className="m-5">
        <MyMap />
      </div>
    </div>
  );
};

export default Index;
