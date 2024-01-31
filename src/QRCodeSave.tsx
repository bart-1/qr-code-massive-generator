import { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { saveToPng } from "./helpers";
import { toCanvas } from "html-to-image";

interface QRCodeSaveProps {
  qr: string;
}

const QRCodeSave = ({ qr }: QRCodeSaveProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const[isVisible, setIsVisible] = useState(true)


   useEffect( () => {
       
        return () => {
         setIsVisible(false);
        }
   }, [] );
    
    useEffect( () => {
        saveOnServer();
    }, [ref] );
    
     const saveOnServer = () => {
       if (ref.current === null) return;

      
         toCanvas(ref.current, {
           cacheBust: true,
           pixelRatio: 2,
           style: { textAlign: "center", padding: "0", margin: "0" },
         })
           .then((dataUrl) => {
             saveToPng(
               dataUrl.toDataURL("image/png"),
               "my" + String(Date.now())
             );
           })
           .catch((err) => {
             console.log(err);
           })
       
     };

  return (
    <>
      {isVisible && <div
        className={`absolute w-[300px] h-[300px] bg-black`}
        ref={ref}
      >
        <QRCode
          value={qr}
          style={{
            width: "300px",
            height: "300px",
            maxHeight: "300px",
              maxWidth: "300px",
           
            
          }}
          viewBox={`0 0 256 256`}
        />
      </div>}
    </>
  );
};
export default QRCodeSave;
