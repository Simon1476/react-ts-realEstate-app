import React, { createContext, useEffect, useState } from "react";
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: any; // Adjust the type based on Cloudinary's documentation
    };
  }
}

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext<{ loaded: boolean }>({
  loaded: false,
});

type CloudinaryUploadWidgetProps = {
  uwConfig: {
    multiple: boolean;
    cloudName: string;
    uploadPreset: string;
    folder: string;
  };
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

type CloudinaryUploadResult = {
  event: string;
  info: CloudinaryUploadInfo;
};

type CloudinaryUploadInfo = {
  secure_url: string;
};
function UploadWidget({ uwConfig, setImages }: CloudinaryUploadWidgetProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: CloudinaryUploadResult) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setImages((prev) => [...prev, result.info.secure_url]);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        () => {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
}

export default UploadWidget;
export { CloudinaryScriptContext };
