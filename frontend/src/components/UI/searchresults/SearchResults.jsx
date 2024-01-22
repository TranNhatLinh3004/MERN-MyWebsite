import React, { useEffect, useState } from "react";
import products from "../../../assets/data/products";
import { motion } from "framer-motion";
import ProductSearch from "../productsearch/ProductSearch";

function SearchResults(props) {
  const [productsData, setProductsData] = useState(products);
  const [showMore, setShowMore] = useState(false);
  const [numberProducts, setNumberProducts] = useState(0);
  console.log("SearchResults", props.value);
  const handleSearch = (e) => {
    let val = props.value;
    if (val) {
      const filteredProduct = products.filter((item) =>
        item.productName.toLowerCase().includes(val.toLowerCase())
      );
      setNumberProducts(filteredProduct.length);
      setProductsData(filteredProduct.slice(0, 4));
      setShowMore(filteredProduct.length > 4);
    } else {
      setProductsData([]);
      setShowMore(false);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [props.value]);
  return (
    <div className="wrapper__results">
      {productsData.length === 0 ? (
        <p
          className="text-center"
          style={{
            textAlign: "center",
            color: "gray",
          }}
        >
          Không có sản phẩm nào...
        </p>
      ) : (
        <>
          {productsData?.map((item, index) => (
            <ProductSearch item={item} key={index} />
          ))}
        </>
      )}{" "}
      {showMore && (
        <button
          className="btn__search"
          style={{
            width: "100%",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "17px",
            height: "30px",
          }}
        >
          Xem thêm
        </button>
      )}
    </div>
  );
}

export default SearchResults;
