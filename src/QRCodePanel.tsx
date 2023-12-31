import { toCanvas, toPng, toSvg } from "html-to-image";
import { useCallback, useRef } from "react";
import QRCode from "react-qr-code";
import { saveToPng } from "./helpers";
// import { saveToPng } from "./savePng";

interface QRCodePanelProps {
  inputData: string;
}

type FileType = "svg" | "png" | "canvas";

const QRCodePanel = ({ inputData }: QRCodePanelProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const filter = (node: HTMLElement) => {
    return node.tagName !== "i";
  };

  const saveByBrowser = useCallback(
    (fileType: FileType) => {
      if (ref.current === null) {
        return;
      }
      if (fileType === "png") {
        toPng(ref.current, { cacheBust: true })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "my-qr-code.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (fileType === "svg") {
        toSvg(ref.current, { filter: filter })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "my-qr-code.svg";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (fileType === "canvas") {
        toCanvas(ref.current, {
          cacheBust: true,
          pixelRatio: 2,
          style: { textAlign: "center", padding: "0", margin: "0" },
        })
          .then((dataUrl) => {
            saveToPng(dataUrl.toDataURL("image/png"), "my");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [ref]
  );

  //   const onButtonClick = useCallback(() => {
  //     if (ref.current === null) {
  //       return;
  //     }

  //     toCanvas(ref.current, {
  //       cacheBust: true,
  //       pixelRatio: 2,
  //       style: { textAlign: "center", padding: "0", margin: "0" },
  //     })
  //       .then((dataUrl) => {
  //         saveToPng(dataUrl.toDataURL("image/png"));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [ref]);
  return (
    <>
      <div className="flex flex-col gap-3 p-3 bg-black w-fit mx-auto mt-12 border-1 rounded-xl shadow-xl">
        <div
          id="qr"
          ref={ref}
          className="flex justify-center items-center bg-white mx-auto w-[32vw] h-[32vw] max-w-[300px] max-h-[300px]"
        >
          <QRCode
            value={inputData}
            style={{
              width: "30vw",
              height: "30vw",
              maxHeight: "280px",
              maxWidth: "280px",
            }}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="w-fit p-3 border-1 rounded-md bg-blue-500 hover:bg-blue-300 self-center"
            onClick={() => saveByBrowser("png")}
          >
            {" "}
            Save PNG
          </button>
          {/* <button
            className="w-fit p-3 border-1 rounded-md bg-blue-500 hover:bg-blue-300 self-center"
            onClick={() => saveByBrowser("svg")}
          >
            {" "}
            Save SVG
          </button> */}
          {/* <button
            className="w-fit p-3 border-1 rounded-md bg-blue-500 hover:bg-blue-300 self-center"
            onClick={onButtonClick}
          >
            {" "}
            Save
          </button> */}
        </div>
      </div>
    </>
  );
};
export default QRCodePanel;
