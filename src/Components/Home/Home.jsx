import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AllPosts from "./AllPosts";

export default function () {
  return (
    <>
      <Helmet>
        <title>Hello world | Home</title>
      </Helmet>
      <div>
        <Banner></Banner>
        <AllPosts></AllPosts>
      </div>
    </>
  );
}
