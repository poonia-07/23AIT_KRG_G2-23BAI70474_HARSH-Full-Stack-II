const ResultBox = ({ shortUrl }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div className="result">
      <a href={shortUrl} target="_blank" rel="noreferrer">
        {shortUrl}
      </a>
      <button className="copy-btn" onClick={copyToClipboard}>
        Copy
      </button>
    </div>
  );
};

export default ResultBox;
