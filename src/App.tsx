import { useState } from "react";
import QRvCard from "./QRvCard";
import SwitchBtn from "./SwitchBtn";
import QRCodePanel from "./QRCodePanel";
import InputFile from "./InputFile";
import CheckBox from "./CheckBox";
import { FileCSVData } from "./helpers";
import MassiveQRCodePanel from "./MassiveQRCodePanel";

const App = () => {
  const [vCardForm, setVCardForm] = useState(false);

  const [qrDataIn, setQrDataIn] = useState("");
  const [fileOutputData, setFileOutputData] = useState<FileCSVData[]>();
  const [isMultiData, setIsMultiData] = useState(false);



  return (
    <div className="bg-gray-700 mx-auto">
      <div className="p-3 h-16 bg-black text-white mb-12">
        <h1 className="font-bold text-2xl text-center">
          QR code generator v0.1
        </h1>
      </div>

      {!isMultiData ? (
        <>
          <div className="mx-auto mb-12 w-fit">
            <SwitchBtn
              nameOne="text"
              nameTwo="vCard"
              output={(val) => setVCardForm(val)}
            />
          </div>
          <div className="mx-auto w-[85%] max-w-[780px] xl:flex justify-center ">
            {vCardForm ? (
              <QRvCard
                isVCard={false}
                output={(text) => setQrDataIn(text)}
              />
            ) : (
              <QRvCard
                isVCard={true}
                output={(text) => setQrDataIn(text)}
              />
            )}
          </div>
        </>
      ) : (
        ""
      )}
      {!isMultiData ? (
        <QRCodePanel inputData={qrDataIn} />
      ) : (
        <>
          <MassiveQRCodePanel multiDataArray={fileOutputData} />
          <InputFile output={(data) => setFileOutputData(data)} />
        </>
      )}
      <CheckBox output={(agreement) => setIsMultiData(agreement)} />
    </div>
  );
};

export default App;
