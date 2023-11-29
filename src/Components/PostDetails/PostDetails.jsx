import { useLoaderData } from "react-router-dom";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { CiShare2 } from "react-icons/ci";
import { useState } from "react";
export default function () {
  const postById = useLoaderData();
  const [comment, setComment] = useState();
  const {
    authorImage,
    authorName,
    authorEmail,
    postTitle,
    postDescription,
    postUpVote,
    postDownVote,
    selectedValue,
    UserEmail,
    timestamp,
  } = postById;
  const formattedTime = new Date(timestamp).toLocaleString();
  console.log(postById);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.comment.value);
  };

  // const handleCommentChange = (e) => {
  //   setComment(e.target.value);
  // };

  return (
    <>
      <div className="container mx-auto">
        <div className="card mx-auto w-96 lg:w-full lg:card-side glass">
          <figure className="lg:w-80">
            <img src={authorImage} alt="author image" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{authorName}</h2>
            <h2 className="card-title">{postTitle}</h2>
            <p>{postDescription}</p>
            <div className="lg:flex gap-2 justify-start items-center">
              <h2 className="card-title">{selectedValue}</h2>
              <h2 className="card-title">{formattedTime}</h2>
              <h2 className="card-title">
                <BiSolidUpvote />
              </h2>
              <h2 className="card-title">
                <BiSolidDownvote />
              </h2>
              <h2 className="card-title">
                <CiShare2 />
              </h2>
            </div>
          </div>
        </div>
        <div>
          <div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Comment</span>
                </label>
                <input
                  type="textarea"
                  name="comment"
                  placeholder="Comments here..."
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control w-20 mt-6">
                <button className="btn btn-primary">comment</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
