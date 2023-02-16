import { useEffect, useRef, useState } from "react";
import domtoimage from 'dom-to-image';


export default function Home() {
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [dropped, setDropped] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
    const container = useRef(null);

    function exportToPng(dom:any) {
  domtoimage
    .toPng(dom)
    .then(function (dataUrl) {
      let a:any = document.createElement("A");
            a.href = dataUrl;
            a.download = `beautify.sonicodes.in ${new Date().toISOString()}.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
}


  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setDropped(true);
  };

  return (
    <div className="flex flex-col items-center justify-center main h-screen w-screen">
      {dropped ? (
        <>
          <div ref={container} className="relative flex items-center justify-center flex-col rounded-lg bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 w-1/2 h-3/4 ">
            <div className="image">
              <img
                className="rounded-2xl max-h-64  max-w-md"
                src={preview}
                alt=""
              />
            </div>
          </div>
             <div onClick={() => exportToPng(container.current)}  className="m-4 px-4 py-2 text-white bg-gradient-to-br from-red-400 to-pink-600 flex items-center justify-center duration-100 cursor-pointer rounded-2xl	 text-sm font-semibold !justify-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 256 256"
          className="mr-1"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></path>
          <polyline
            points="152 32 152 88 208 88"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></polyline>
          <polyline
            points="100 156 128 184 156 156"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></polyline>
          <line
            x1="128"
            y1="120"
            x2="128"
            y2="184"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="16"
          ></line>
        </svg>
        <span>Save</span>
      </div>
        </>
      ) : (
        <div className="flex items-center justify-center ">
          <label
            className="flex  items-center justify-center text-lg opacity-60  rounded-2xl p-20  dark:text-white cursor-pointer border-2 border-dashed border-gray-400 hover:opacity-80 duration-700"
            htmlFor="imagesUpload"
          >
            <input
              className="hidden"
              id="imagesUpload"
              accept="image/x-png,image/gif,image/jpeg"
              type="file"
              onChange={onSelectFile}
            />
            <p>Click here to add your image</p>
          </label>
        </div>
      )}
   
    </div>
  );
}
