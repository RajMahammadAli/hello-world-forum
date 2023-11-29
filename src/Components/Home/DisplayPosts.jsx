export default function ({ post, handleAllPosts }) {
  const formattedTime = new Date(post.timestamp).toLocaleString();
  return (
    <>
      <div
        onClick={() => handleAllPosts(post._id)}
        className="card card-side w-full bg-base-100 shadow-xl"
      >
        <div className="avatar p-4">
          <div className="w-24 h-24 rounded-full">
            <img src={post.authorImage} />
          </div>
        </div>

        <div className="card-body">
          <h2 className="card-title">{post.postTitle}</h2>
          <p>{post.postDescription}</p>
          <p>{post.selectedValue}</p>

          <p>Time of Post: {formattedTime}</p>
          <p>Comment Count </p>
        </div>
      </div>
    </>
  );
}
