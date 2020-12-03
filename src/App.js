import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import classNames from "classnames";
import credentials from "./keys";
import { Loader } from "react-full-page-loader-overlay";
import Palette from "./Palette";
import Masonry from "react-masonry-css";
import breakpointColumnsObj from "./Constants";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [dataUnavailable, setDataUnavailable] = useState(false);
  const [result, setResult] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [domColList, setDomColList] = useState([]);
  const classes = useStyles();
  let duplicateItem = [];

  const getData = () => {
    const imageFetchURL = `https://www.googleapis.com/customsearch/v1?key=${credentials.API_KEY}&cx=${credentials.CSR_ID}&q=${query}&searchType=image`;
    fetch(imageFetchURL)
      .then((response) => response.json())
      .then(
        (data) => {
          if (!data) {
            return setDataUnavailable(true);
          }
          const items = data.items;
          if (!items) {
            return setDataUnavailable(true);
          }
          Object.keys(items).map((val) => {
            colorList.push(items[val].image.thumbnailLink);
          });
        },
        (error) => {
          console.log(`Error arised in home page ${error}`);
          return setDataUnavailable(true);
        }
      );
    setLoader(true);
    setTimeout(() => {
      setResult(true);
      setLoader(false);
    }, 3000);
  };

  const cancelSearch = () => {
    setQuery("");
    setResult(false);
    setColorList([]);
    setDomColList([]);
    duplicateItem = [];
    if (dataUnavailable) setDataUnavailable(false);
  };

  const onUserInput = (value) => {
    if (value) {
      setQuery(value);
    } else {
      cancelSearch();
    }
  };

  const colorItems =
    domColList.length > 0 &&
    colorList.length <= 0 &&
    Object.keys(domColList).map((color) => {
      const name = domColList[color].name;
      const code = domColList[color].code;
      if (duplicateItem.length > 0 && duplicateItem.includes(code)) {
        return <span></span>;
      }
      duplicateItem.push(code);
      return (
        <p
          className={classes.colorBox}
          id={code}
          style={{
            backgroundColor: code,
            color: code === "#000000" ? "#fff" : "#000"
          }}
        >
          {name}
        </p>
      );
    });

  return (
    <div className={classes.root}>
      <title className={classes.content}>Image Search</title>
      {/* Ref: https://www.npmjs.com/package/material-ui-search-bar */}
      <SearchBar
        className={classes.search}
        value={query}
        onChange={(value) => {
          onUserInput(value);
        }}
        onRequestSearch={() => getData()}
        onCancelSearch={() => cancelSearch()}
      />

      {loader && !dataUnavailable && <Loader show={true} />}

      {dataUnavailable && (
        <div className={classNames(classes.content, classes.dataUnavailable)}>
          Data Unavailable
        </div>
      )}
      {result &&
        colorList.map((url, index) => {
          return (
            <Palette
              key={index}
              url={url}
              setDomColList={setDomColList}
              domColList={domColList}
              colorList={colorList}
              setColorList={setColorList}
            />
          );
        })}

      {result && domColList.length > 0 && colorList.length <= 0 && (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {colorItems}
        </Masonry>
      )}
    </div>
  );
};

export default App;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#000"
  },
  search: {
    margin: "0 auto"
  },
  content: {
    textAlign: "center",
    fontFamily: "metropolis",
    fontSize: "30px",
    color: "#FF0000",
    display: "block",
    marginTop: "30px"
  },
  dataUnavailable: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    marginBottom: "20px",
    color: "#39414d"
  },
  colorBox: {
    width: 200,
    height: 200,
    textAlign: "center",
    justifyContent: "center",
    fontSize: "24px"
  }
});
