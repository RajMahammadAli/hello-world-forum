export default function () {
  return (
    <>
      <div className="container mx-auto">
        <div className="card mx-auto w-96 lg:w-full lg:card-side glass">
          <figure className="lg:w-80">
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="author image"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Author Name</h2>
            <h2 className="card-title">Post Title</h2>
            <p>Post Description</p>
            <div className="lg:flex gap-2 justify-center items-center">
              <h2 className="card-title">Tag</h2>
              <h2 className="card-title">Post Time</h2>
              <div className="card-actions justify-start">
                <button className="btn btn-primary">Comment</button>
              </div>
              <h2 className="card-title">UpVote Icon</h2>
              <h2 className="card-title">DownVote Icon</h2>
              <h2 className="card-title">Share</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
