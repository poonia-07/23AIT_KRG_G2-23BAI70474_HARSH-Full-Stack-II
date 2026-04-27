import React, { useState } from "react";

const PaginatedList = () => {
  const items = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
  }));

  const itemsPerPage = 5;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Paginated List</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {currentItems.map(item => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {item.name}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;