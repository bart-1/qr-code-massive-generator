import { FormEvent, useEffect, useState } from "react";

interface QRvCardProps {
  output: (vCard: string) => void;
  inputsList: { [key: string]: string };
  vcard: boolean;
}

const QRvCard = ({ output, inputsList, vcard }: QRvCardProps) => {
  const [vCardForm, setVCardForm] = useState(inputsList);
  const [unlockBtn, setUnlockBtn] = useState(false);

  useEffect(() => {
    setUnlockBtn(false);
  }, []);

  const vCard = `BEGIN:VCARD
VERSION:3.0
N:${vCardForm.lastname};${vCardForm.firstName}
FN:${vCardForm.firstName} ${vCardForm.lastname}
ORG:${vCardForm.organization}
TITLE:${vCardForm.jobTitle}
ADR:;;${vCardForm.street};${vCardForm.city};${vCardForm.state};${vCardForm.postCode};${vCardForm.country}
TEL;WORK;VOICE:${vCardForm.workPhone}
TEL;CELL:${vCardForm.cellPhone}
TEL;FAX:${vCardForm.fax}
EMAIL;WORK;INTERNET:${vCardForm.email}
URL:${vCardForm.url}
END:VCARD`;

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    vcard ? output(vCard) : output(vCardForm.text);
  };

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setVCardForm(
      (state) =>
        (state = {
          ...state,
          [`${name}`]: value,
        })
    );
    setUnlockBtn(true);
  };
  const inputGenerator = Object.keys(inputsList).map((input, index) => (
    <div
      className="flex align-middle justify-between w-[370px] border-0 m-1 border-gray-700 rounded-r-md"
      key={index}
    >
      <label className="self-center uppercase">{input}:</label>
      <input className="h-8 self-center" name={input} onChange={handleInput} />
    </div>
  ));

  return (
    <>
      <div className=" pt-3 rounded-xl border-black bg-gray-500 shadow-xl">
        <form className="flex flex-wrap justify-center" onSubmit={handleForm}>
          {inputGenerator}
          <div className="bg-black p-2 w-full items-center rounded-b-xl border-1 mt-2 h-16 text-center justify-center">
            <button
              className={`w-fit p-3 border-1 ${
                unlockBtn ? " bg-blue-500 hover:bg-blue-300" : `bg-gray-500`
              } rounded-md`}
              type="submit"
              disabled={!unlockBtn ? true : false}
            >
              Generate QR
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default QRvCard;
