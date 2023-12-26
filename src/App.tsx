import { useState } from "react";
import QRvCard from "./QRvCard";
import SwitchBtn from "./SwitchBtn";
import QRCodePanel from "./QRCodePanel";

const App = () => {
  const [vCardForm, setVCardForm] = useState(false);

  const [qrDataIn, setQrDataIn] = useState("");

  return (
    <div className="bg-gray-700 mx-auto">
      <div className="p-3 h-16 bg-black text-white mb-12">
        <h1 className="font-bold text-2xl text-center">
          QR code generator v0.1
        </h1>
      </div>

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
            vcard={false}
            output={(text) => setQrDataIn(text)}
            inputsList={{
              text: "",
            }}
          />
        ) : (
          <QRvCard
            output={(text) => setQrDataIn(text)}
            vcard={true}
            inputsList={{
              firstName: "",
              lastname: "",
              organization: "",
              jobTitle: "",
              street: "",
              city: "",
              state: "",
              postCode: "",
              country: "",
              workPhone: "",
              cellPhone: "",
              fax: "",
              email: "",
              url: "",
            }}
          />
        )}
      </div>
      <QRCodePanel inputData={qrDataIn} />
    </div>
  );
};

export default App;
