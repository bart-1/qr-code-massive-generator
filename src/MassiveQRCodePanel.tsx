import BussyAnimIco from "./BussyAnimIco";
import { FileCSVData, createVCardString } from "./helpers";
import QRCodeSave from "./QRCodeSave";

interface QRCodePanelProps {
  multiDataArray: FileCSVData[] | undefined;
}

const MassiveQRCodePanel = ({ multiDataArray }: QRCodePanelProps) => {
  if (!multiDataArray) return <div></div>;
  const qrGenerator = multiDataArray.map((el, index) => (
    <div
      key={"qr" + index}
      className={`flex justify-center items-center bg-white mx-auto w-[32vw] h-[32vw] max-w-[300px] max-h-[300px]`}
    >
      <QRCodeSave qr={createVCardString(el)} />
    </div>
  ));

  return (
    <>
      <div className="p-3 bg-black w-[324px] h-[324px] mx-auto mt-12 border-1 rounded-xl shadow-xl">
        <div className="justify-center overflow-hidden">
          <div
            id="qr"
            className="fixed justify-center h-[300px] w-[300px] items-center mx-auto overflow-hidden bg-white"
          >
            <div className="flex w-full h-full justify-center items-center">
              <BussyAnimIco switchOnOff={true} />
            </div>

            {qrGenerator}
          </div>
        </div>
      </div>
    </>
  );
};
export default MassiveQRCodePanel;
