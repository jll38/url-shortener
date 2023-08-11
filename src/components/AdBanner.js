"use client";
import { useEffect } from "react";

export const AdBanner = (props) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <ins
        class="adsbygoogle"
        style={{
            display: 'block',
            overflow: 'hidden',
        }}
        data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        {...props}
        data-ad-slot="1800190570"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};
export default AdBanner;
