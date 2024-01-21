import { FormEvent, useEffect, useState } from "react";
import { FileCSVData, initialFileCSVData, createVCardString } from "./helpers";

interface QRvCardProps {
  output: (vCard: string) => void;
  isVCard: boolean;
}

const QRvCard = ({ output, isVCard }: QRvCardProps) => {
  const [vCardForm, setVCardForm] = useState<FileCSVData>(initialFileCSVData);
  const [unlockBtn, setUnlockBtn] = useState(false);

  useEffect(() => {
    setUnlockBtn(false);
  }, []);

  useEffect(() => {
    setUnlockBtn(false);
    setVCardForm(initialFileCSVData);
  }, [isVCard]);

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    isVCard
      ? output(createVCardString(vCardForm))
      : output(vCardForm.firstname);
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
    if (value !== "") {
      setUnlockBtn(true);
    } else {
      setUnlockBtn(false);
    }
  };
  const inputGenerator = Object.keys(vCardForm).map((input, index) => (
    <div
      className="flex align-middle justify-between w-[370px] border-0 m-1 border-gray-700 rounded-r-md"
      key={index}
    >
      <label className="self-center uppercase">{input}:</label>
      <input className="h-8 self-center" name={input} onChange={handleInput} />
    </div>
  ));

  const singleInput = (
    <div className="flex align-middle justify-between w-[370px] border-0 m-1 border-gray-700 rounded-r-md">
      <label className="self-center uppercase">Text:</label>
      <input
        className="h-8 self-center"
        name={`firstname`}
        onChange={handleInput}
      />
    </div>
  );

  return (
    <>
      <div className=" pt-3 rounded-xl border-black bg-gray-500 shadow-xl">
        <form className="flex flex-wrap justify-center" onSubmit={handleForm}>
          {isVCard ? inputGenerator : singleInput}
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
