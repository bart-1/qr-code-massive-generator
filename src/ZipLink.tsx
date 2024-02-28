import { useAppStore } from "./AppStore";

const ZipLink = () => {
  const zipIsReady = useAppStore((state) => state.zipIsReady);
  const folderName = useAppStore((state) => state.folderName);

  const handleClick = () => {
    fetch(`../zip/qr_${folderName}.zip`, { method: "GET" })
    .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr_${folderName}.zip`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      {zipIsReady && (
        <div className="mx-auto mt-4 w-fit">
          <span className="w-full text-center">
            <span className="font-extrabold">Your file: </span>
          </span>
          <button
            className="w-fit text-black hover:text-gray-500 text-center underline"
            onClick={handleClick}
          >
            <span>{`qr_${folderName}.zip`}</span>
          </button>
        </div>
      )}
    </>
  );
};
export default ZipLink;
