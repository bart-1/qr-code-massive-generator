import { ChangeEvent, useEffect, useState } from "react";
import {
  FileCSVData,
  changeMultiArrayToObjectsArray,
  convertDataStringToMultiArray,
} from "./helpers";
import { useAppStore } from "./AppStore";



const InputFile = () => {
  const [file, setFile] = useState<File | Blob>();
  const [fileData, setFileData] = useState<string | ArrayBuffer>();
  const [outputReadyData, setOutputReadyData] = useState<FileCSVData[]>();

  const setFileDataRecordsArray = useAppStore(
    (state) => state.setFileDataRecordsArray
  );


  useEffect(() => {
    if (outputReadyData) setFileDataRecordsArray(outputReadyData);
  }, [outputReadyData]);

  useEffect(() => {
    if (file && fileData) {
      const parsedFileData = convertDataStringToMultiArray(fileData);
        const objectsArrayFileData = changeMultiArrayToObjectsArray(parsedFileData);
      setOutputReadyData(objectsArrayFileData);
    }
  }, [fileData]);

  useEffect(() => {
    const fileReader = new FileReader();
    let isProcessing: Boolean = false;

    if (file) {
      fileReader.onload = (e) => {
        if (e.target && e.target.result !== null && !isProcessing) {
          setFileData(e.target.result);
        }
      };
    }
    if (file) fileReader.readAsText(file);
    return () => {
      isProcessing = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files === null) return;

    const file = e.currentTarget.files[0];
    setFile(file);
  };

  return (
    <>
      <div className="flex h-16 mx-auto items-center w-fit bg-black mt-5 border-1 rounded-xl shadow-lg">
        <input
          type="file"
          onChange={handleFile}
          className="bg-black file:border-0 file:bg-blue-500 file:hover:bg-blue-300 file:w-fit file:p-3 file:rounded-md text-white label:p-0"
          accept=".txt"
        />
      </div>
    </>
  );
};
export default InputFile;
