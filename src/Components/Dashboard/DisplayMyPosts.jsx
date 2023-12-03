import { Link } from "react-router-dom";

export default function ({ post, handleDelete }) {
  return (
    <>
      <tr>
        <td className="border-b p-2 text-center">{post.postTitle}</td>
        <td className="border-b p-2 text-center">
          Up Vote: {post.postUpVote} <span>Down Vote: {post.postDownVote}</span>
        </td>
        <td className="border-b p-2 grid gap-4 justify-center">
          {/* <Link to={`/comments/${post._id}`} className="btn btn-info mr-2">
                Comments
              </Link> */}
          <Link
            to={`/dashboard/comments/${post._id}`}
            className="btn btn-info mr-2"
          >
            Comments
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}
