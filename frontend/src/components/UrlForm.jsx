const UrlForm = ({ onShorten }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = e.target.url.value;
    onShorten(url);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="url"
        name="url"
        className="input"
        placeholder="Enter long URL..."
        required
      />
      <button className="button">Shorten</button>
    </form>
  );
};

export default UrlForm;
