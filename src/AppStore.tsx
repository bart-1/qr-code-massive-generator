import { create } from "zustand";
import { FileCSVData } from "./helpers";

interface AppState {
  folderName: string;
  setFolderName: () => void;
  useVCardForm: boolean;
  setUseVCardForm: (bool: boolean) => void;
  qrCreatorInputString: string;
  setQrCreatorInputString: (qrString: string) => void;
  fileDataRecordsArray: FileCSVData[];
  setFileDataRecordsArray: (data: FileCSVData[]) => void;
  useMultiRecordsFile: boolean;
  setUseMultiRecordsFile: (bool: boolean) => void;
  zipIsReady: boolean;
  setZipIsReady: (bool: boolean) => void;
  generatorProgress: number;
  setGeneratorProgress: () => void;
  lastQRRenderIndex: number;
  setLastQRRenderIndex: (index: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  folderName: "",
  setFolderName: () => set(() => ({ folderName: String(Date.now()) })),
  useVCardForm: false,
  setUseVCardForm: (bool) => set(() => ({ useVCardForm: bool })),
  qrCreatorInputString: "empty",
  setQrCreatorInputString: (qrString) =>
    set(() => ({ qrCreatorInputString: qrString })),
  fileDataRecordsArray: [],
  setFileDataRecordsArray: (data) =>
    set(() => ({ fileDataRecordsArray: data })),
  useMultiRecordsFile: false,
  setUseMultiRecordsFile: (bool) => set(() => ({ useMultiRecordsFile: bool })),
  zipIsReady: false,
  setZipIsReady: (bool) => set(() => ({ zipIsReady: bool })),
  generatorProgress: 0,
  setGeneratorProgress: () =>
    set((state) => ({ generatorProgress: state.generatorProgress + 1 })),
  lastQRRenderIndex: 0,
  setLastQRRenderIndex: (num) => set(() => ({ lastQRRenderIndex: num })),
}));
