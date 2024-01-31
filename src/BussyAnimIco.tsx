import { useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoQrCodeOutline, IoQrCode, IoQrCodeSharp } from "react-icons/io5";
import { AiOutlineQrcode } from "react-icons/ai";
import { MdOutlineQrCode, MdOutlineQrCode2 } from "react-icons/md";


interface BussyAnimIcoProps {
    switchOnOff: boolean;
}

const BussyAnimIco = ({switchOnOff}: BussyAnimIcoProps) => {
    const icoArr = [
      <IoQrCodeOutline />,
      <IoQrCodeSharp />,
      <IoQrCode />,
      <MdOutlineQrCode />,
      <AiOutlineQrcode />,
      <MdOutlineQrCode2 />,
    ];
    const [item, setItem] = useState(0);
    const [countUp, setCountUp] = useState(true)
    // const [iconArr, setIconArr] = useState<IconType[]>([])
    
    useEffect( () => {
        
      if(!switchOnOff) return 
        const int = setInterval(() => {
            switch (true) {
              case item === 0:
                setCountUp(true);
                setItem((prevState) => prevState + 1);
                break;
              case item === icoArr.length - 1:
                setCountUp(false);
                setItem(icoArr.length - 2);
                break;
              case countUp === true && item > 0 && item < icoArr.length - 1:
                setItem(icoArr.length - 1);
                break;
              case countUp === false && item > 0 && item < icoArr.length - 1:
                setItem(0);
                break;
            }
            
        }, 500)
        
        return() => {
    clearInterval(int);
            }
    }, [item, switchOnOff]);
   
  


  return (
    <>
          <div className="flex flex-col">
            <div className={`text-black rotate-${item*90} transition-all`}>
                <IconContext.Provider value={{ size: "150px" }}>
                {icoArr[item]}
                    </IconContext.Provider>
            </div>
                    <div className="text-center mt-4">Loading...</div>
          </div>
    </>
  );
};
export default BussyAnimIco;
