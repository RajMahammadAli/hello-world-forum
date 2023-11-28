import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import AllPosts from "./AllPosts";
import Announcement from "./Announcement";

export default function () {
  return (
    <>
      <Helmet>
        <title>Hello world | Home</title>
      </Helmet>
      <div>
        <Banner></Banner>
        <Announcement></Announcement>
        <AllPosts></AllPosts>
      </div>
    </>
  );
}
