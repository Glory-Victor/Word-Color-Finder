import React from "react";
import { GetColorName } from "hex-color-to-color-name";
import { usePalette } from "react-palette";

const Palette = ({
  url,
  setDomColList,
  domColList,
  colorList,
  setColorList
}) => {
  const { data } = usePalette(url);
  const hexCode = data.vibrant;
  if (!hexCode) {
    return <span></span>;
  }
  const colorName = GetColorName(hexCode.replace("#", ""));
  const temp = {
    code: hexCode,
    name: colorName
  };
  setDomColList([...domColList, temp]);
  setColorList(colorList.filter((item) => item !== url));
  return (
    <div>
      <img src={url} alt=" "></img>
    </div>
  );
};

export default Palette;
