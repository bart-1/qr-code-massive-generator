import { useEffect } from "react";
import BussyAnimIco from "./BussyIcon";
import { createVCardString, zipFiles } from "./helpers";
import QRCodeSave from "./QRCodeSave";
import { useAppStore } from "./AppStore";

const MassiveQRCodePanel = () => {
  const fileDataRecordsArray = useAppStore(
    (state) => state.fileDataRecordsArray
  );
  const setZipIsReady = useAppStore((state) => state.setZipIsReady);
  const setFolderName = useAppStore((state) => state.setFolderName);
  const folderName = useAppStore((state) => state.folderName);
  const generatorProgress = useAppStore((state) => state.generatorProgress);

  if (!fileDataRecordsArray) return <div></div>;

  useEffect(() => {
    setFolderName();
  }, []);

  useEffect(() => {
    if (
      generatorProgress === fileDataRecordsArray.length - 1 &&
      generatorProgress > 0
      ) {
      zipper();
    }
  }, [generatorProgress]);
  
  const zipper = async () => {
    const zips = await zipFiles(folderName);
    zips ? setZipIsReady(true) : setZipIsReady(false)

  }

  const qrGenerator = fileDataRecordsArray.map((el, index) => (
    <div
      key={"qr" + index}
      className={`absolute justify-center items-center bg-white mx-auto w-[32vw] h-[32vw] max-w-[300px] max-h-[300px]`}
    >
      <QRCodeSave qr={createVCardString(el)} index={index} />
    </div>
  ));

  return (
    <>
      <div className="p-3 bg-black w-[324px] h-[324px] mx-auto mt-12 border-1 rounded-xl shadow-xl">
        <div
          id="qr"
          className="absolute justify-center h-[300px] w-[300px] items-center mx-auto overflow-hidden bg-white over"
        >
          <div className="flex z-10 h-full justify-center items-center">
            <BussyAnimIco switchOnOff={true} />
          </div>

          <div className="flex z-10 h-full justify-center items-center">
            {qrGenerator}
          </div>
        </div>
      </div>
    </>
  );
};
export default MassiveQRCodePanel;
