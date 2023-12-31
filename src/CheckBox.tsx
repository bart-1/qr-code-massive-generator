import { useEffect, useState } from "react";

interface CheckBoxProps {
output: (agreement: boolean) => void;
}

const CheckBox = ({ output }: CheckBoxProps) => {
    const [result, setResult] = useState(false);

    useEffect( () => {
        output(result);
    }, [result] );
     
        return (
            <>
              <div className="flex gap-3 bg-black w-fit mx-auto mt-5 p-3 text-white rounded-xl shadow-xl"><input type="checkbox" onChange={()=>setResult(prevState=> !prevState )} /><span className="">I have .txt DB </span></div>
            </>
        )
};
export default CheckBox;
