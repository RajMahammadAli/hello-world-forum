export default function () {
  const bannerImg = "../../assets/banner.jpg";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const textField = form.text.value;
    console.log(textField);
    e.target.text.value = "";
  };
  return (
    <>
      <div>
        <div
          className="hero min-h-[500px]"
          style={{
            backgroundImage: "url(https://i.ibb.co/tKBZt8j/banner.jpg)",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content w-full">
            <div className="w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  type="text"
                  name="text"
                  placeholder="Search here ....."
                  className="input input-bordered w-1/2"
                />
              </form>
              <div className="flex justify-center items-center gap-4 mt-2">
                <h1>popular topics:</h1>
                <button className="btn btn-ghost">Helpdesk</button>
                <button className="btn btn-ghost">Introduction</button>
                <button className="btn btn-ghost">Payment</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
