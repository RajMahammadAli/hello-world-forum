import img from "../../assets/log.jpg";

export default function () {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="p-4">
          <div className="card card-side bg-base-100 shadow-xl flex flex-col md:flex-row">
            <figure className="w-full md:w-64 h-64 md:h-auto md:flex-shrink-0">
              <img
                src={img}
                alt="Movie"
                className="object-cover w-full h-full md:w-64 md:h-64"
              />
            </figure>
            <div className="card-body flex flex-col justify-between">
              <div>
                <h2 className="card-title">Post title</h2>
                <p>Click the button to watch on Jetflix app.</p>
              </div>
              <div className="w-80 card-actions flex flex-wrap justify-start">
                <p>Tags</p>
                <p>Time</p>
                <p>Comment Count</p>
                <p>Votes Count</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
