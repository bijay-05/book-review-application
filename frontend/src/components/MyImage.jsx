import React, { useState } from "react";

export default function MyImage({ src }) {
  const [isLoading, setIsLoading] = useState(true);

  const [imageSrc, _] = useState(
    src ??
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s",
  );

  return (
    <img
      className={`w-full h-[200px] object-contain ${isLoading ? "img-skeleton-loading" : ""}`}
      src={imageSrc}
      onLoad={() => {
        setIsLoading(false);
      }}
    />
  );
}
