import QRvCard from "./QRvCard";
import SwitchBtn from "./SwitchBtn";
import QRCodePanel from "./QRCodePanel";
import InputFile from "./InputFile";
import CheckBox from "./CheckBox";
import MassiveQRCodePanel from "./MassiveQRCodePanel";
import { useAppStore } from "./AppStore";
import ZipLink from "./ZipLink";

const App = () => {
  const useVCardForm = useAppStore((state) => state.useVCardForm);
  const setUseVCardForm = useAppStore((state) => state.setUseVCardForm);

  const qrCreatorInputString = useAppStore(
    (state) => state.qrCreatorInputString
  );

  const useMultiRecordsFile = useAppStore((state) => state.useMultiRecordsFile);
  const setUseMultiRecordsFile = useAppStore(
    (state) => state.setUseMultiRecordsFile
  );

  return (
    <div className="bg-gray-700 mx-auto">
      <div className="p-3 h-16 bg-black text-white mb-12">
        <h1 className="font-bold text-2xl text-center">
          QR code generator v0.2
        </h1>
      </div>

      {!useMultiRecordsFile ? (
        <>
          <div className="mx-auto mb-12 w-fit">
            <SwitchBtn
              nameOne="text"
              nameTwo="vCard"
              output={(val) => setUseVCardForm(val)}
            />
          </div>
          <div className="mx-auto w-[85%] max-w-[780px] xl:flex justify-center ">
            {useVCardForm ? (
              <QRvCard isVCard={false} />
            ) : (
              <QRvCard isVCard={true} />
            )}
          </div>
        </>
      ) : (
        ""
      )}
      {!useMultiRecordsFile ? (
        <QRCodePanel inputData={qrCreatorInputString} />
      ) : (
        <>
          <MassiveQRCodePanel />
          <InputFile />
        </>
      )}
      <CheckBox output={(agreement) => setUseMultiRecordsFile(agreement)} />
      <div className="mx-auto mt-4 w-fit">
        <a
          className="w-fit text-black hover:text-gray-500 text-center underline"
          href="./qr-db-matrix.xlsx"
        >
          <span>
            Click here <span>and get DB matrix </span>(qr-db.matrix.xlsx).
          </span>
        </a>
      </div>
      <ZipLink />
    </div>
  );
};

export default App;
