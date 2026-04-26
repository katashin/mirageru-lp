import React from "react";

const NextImage = ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
  <img src={src} alt={alt} {...props} />;

export default NextImage;
