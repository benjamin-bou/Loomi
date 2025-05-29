import { useState } from "react";

export default function LoadingImage({ loaderClassName, className, src, alt }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div
          className={`${loaderClassName} bg-gray-300 animate-pulse rounded-[10px]`}
        ></div>
      )}

      <img
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? "none" : "block" }}
      />
    </>
  );
}
