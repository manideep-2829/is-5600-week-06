import React, { useState, useEffect } from "react";
import Card from './Card'
import Button from './Button';
import Search from "./Search";

const CardList = ({data}) => {
  
const limit = 10;

//const defaultDataset = data.slice(0, limit);


const [offset, setOffset] = useState(0);
const [products, setProducts] = useState((data.slice(0, limit)));
const [filteredData, setFilteredData] = useState(data);

const filterTags = (searchTerm) => {
  const filtered = data.filter((product) => {
    console.log("Product tags:", product.tags); // Log the entire tags array
    return product.tags.some((tag) => {
      console.log("Tag:", tag); // Log each tag
      return typeof tag === "string" && tag.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  console.log("Filtered products:", filtered);
  setFilteredData(filtered);
  setOffset(0);
};

const handlePagination = (direction) => {
  if (direction === 'next') {
    setOffset((prevOffset) => Math.min(prevOffset + limit, filteredData.length - limit)); 
  } else if (direction === 'previous') {
    setOffset((prevOffset) => Math.max(prevOffset - limit, 0));
  }
};


const handlePrevious = () => {
  // set the offset to the previous 10 products
  setOffset(offset - 10);
}

// Define the handleNext function
const handleNext = () => {
  // set the offset to the next 10 products
  setOffset(offset + 10);
}


useEffect(() => {
  // set the products state variable to the next 10 products
  setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData]);
  const hasNextPage = offset + limit < filteredData.length;

    return (
      <div className="cf pa2">
        {/* Search Component */}
        <div className="mt2 mb2">
          <Search handleSearch={filterTags} />
        </div>
  
        {/* Display products */}
        <div className="mt2 mb2">
          {products.map((product) => (
            <Card key={product.id} {...product} />
          ))}
        </div>
  
        {/* Pagination buttons */}
        <div className="flex items-center justify-center pa4">
          <Button text="Previous" handleClick={() => handlePagination('previous')} />
          <Button text="Next" handleClick={() => handlePagination('next')} disabled={!hasNextPage} />
        </div>
      </div>
  )
}

export default CardList;