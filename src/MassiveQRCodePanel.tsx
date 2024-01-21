import { toCanvas } from "html-to-image";
import { useRef } from "react";
import QRCode from "react-qr-code";
import { FileCSVData, saveToPng, createVCardString } from "./helpers";

interface QRCodePanelProps {
  multiDataArray: FileCSVData[] | undefined;
}

const MassiveQRCodePanel = ({ multiDataArray }: QRCodePanelProps) => {
  const refs = useRef<HTMLDivElement[]>([]);

  const saveOnServer = () => {
    if (refs.current === null) return;

    refs.current.map((ref, index) =>
      toCanvas(ref, {
        cacheBust: true,
        pixelRatio: 2,
        style: { textAlign: "center", padding: "0", margin: "0" },
      })
        .then((dataUrl) => {
          saveToPng(
            dataUrl.toDataURL("image/png"),
            "my" + index + String(Date.now())
          );
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  if (!multiDataArray) return <div></div>;
  const qrGenerator = multiDataArray.map((el, index) => (
    <div
      key={"qr" + index}
      className={`flex justify-center items-center bg-white mx-auto w-[32vw] h-[32vw] max-w-[300px] max-h-[300px]`}
      ref={(el) => {
        refs.current[index] = el!;
      }}
    >
     
        <QRCode
          value={createVCardString(el)}
          style={{
            width: "30vw",
            height: "30vw",
            maxHeight: "280px",
            maxWidth: "280px",
          }}
          viewBox={`0 0 256 256`}
        />
      </div>
    
  ));

  return (
    <>
      <div className="flex flex-col gap-3 p-3 bg-black w-fit mx-auto mt-12 border-1 rounded-xl shadow-xl">
        <div className="flex justify-center">
          <button
            className="flex-none w-fit p-3 border-1 rounded-md bg-blue-500 hover:bg-blue-300 self-center"
            onClick={saveOnServer}
          >
            Save
          </button>
          <div
            id="qr"
            ref={(el) => {
              refs.current[0] = el!;
            }}
            className="flex justify-center items-center bg-white mx-auto w-fit h-[32vw] max-h-[300px]"
          >
            {qrGenerator}
          </div>
        </div>
      </div>
    </>
  );
};
export default MassiveQRCodePanel;
