import React from "react";
import { useEffect } from "react";

export default function VideoWistia({ videoCode }: { videoCode: string }) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://fast.wistia.com/embed/medias/ocw0jxqsi0.jsonp";
    script1.async = true;

    const script2 = document.createElement("script");
    script2.src = "https://fast.wistia.com/assets/external/E-v1.js";
    script2.async = true;

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      script1.remove();
      script2.remove();
    };
  }, []);

  return (
    <div
      className="w-full h-full relative inset-0 flex items-center justify-center"
    >
        <div className="w-full h-max aspect-video"  dangerouslySetInnerHTML={{ __html: videoCode }}/>
    </div>
  );
}
