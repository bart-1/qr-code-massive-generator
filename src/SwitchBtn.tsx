import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { PiToggleLeftFill, PiToggleRightFill } from "react-icons/pi";

interface SwitchBtnProps {
  nameOne: string;
  nameTwo: string;
  output: (value: boolean) => void;
}

const SwitchBtn = ({ nameOne, nameTwo, output }: SwitchBtnProps) => {
  const [val, setVal] = useState(true);

  const handleBtn = () => {
    setVal((prevState) => !prevState);
  };

  useEffect(() => {
    output(val);
  }, [val]);

  return (
    <>
      <div className="flex gap-4 px-4 w-fit items-center bg-black p-2 border-1 font-bold rounded-xl text-white shadow-xl">
        <div>{nameOne}</div>
        <IconContext.Provider value={{ color: "white", size: "40px" }}>
          <div className="">
            <button onClick={handleBtn} className="text-white">
              {val ? <PiToggleLeftFill /> : <PiToggleRightFill />}
            </button>
          </div>
        </IconContext.Provider>
        <div>{nameTwo}</div>
      </div>
    </>
  );
};
export default SwitchBtn;
