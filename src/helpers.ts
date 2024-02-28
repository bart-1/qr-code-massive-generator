interface Property {
  [key: string]: string;
}
export interface FileCSVData extends Property {
  lastname: string;
  firstname: string;
  organization: string;
  jobTitle: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  workPhone: string;
  cellPhone: string;
  fax: string;
  email: string;
  url: string;
}

export const initialFileCSVData: FileCSVData = {
  lastname: "",
  firstname: "",
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
};

export const convertDataStringToMultiArray = (
  data: string | ArrayBuffer
): Array<string[]> => {
  const firstStep = String(data).replaceAll("\t", "|").split("\n");
  const secondStep = firstStep.map((el) => el.split("|"));

  return secondStep;
};

export const changeMultiArrayToObjectsArray = (
  array: Array<string[]>
): FileCSVData[] => {
  const keysArray = array[0];
  const objectsArray: FileCSVData[] = [initialFileCSVData];
  let singleObject: FileCSVData = initialFileCSVData;

  array.map((arr) => {
    keysArray.forEach((element, index) => {
      if (singleObject.hasOwnProperty(element))
        singleObject[element] = arr[index];
    });
    objectsArray.push({ ...singleObject }); //spread operator is added for making copy of object, without it every iteration add to array only reference of object, so after this if it changes property value in one object, it changes by reference in each object of  array.
  });

  return objectsArray;
};

export const saveToPng = async (
  img: string,
  fileName: string | number,
  folderName: string
) => {
  let response = false;
  await fetch("http://localhost:8001/php/save-png.php", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      img: img,
      fileName: `qr_${fileName}`,
      folderName: `qr_${folderName}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) =>
      res.status === 200 ? (response = true) : (response = false)
    )

    .catch((err) => {
      console.log(err);
    });
  return response;
};
export const zipFiles = async (zipName: string) => {
  let response = false;

  await fetch("http://localhost:8001/php/zip-files.php", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      zipName: `qr_${zipName}`,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) =>
      res.status === 200 ? (response = true) : (response = false)
    )
    .catch((err) => {
      console.log(err);
    });
  return response;
};

// export const downloadFile = (path: string) => {
//   fetch("http://localhost:8001/php/download-file.php", {
//     method: "POST",
//     mode:"cors",
//     body: JSON.stringify({
//       path: path,
//     }),

//     headers: {
//       "Content-type": "application/json; charset=UTF-8",
//     },
//   }).catch((err) => {
//     console.log(err);
//   });
// };

export const createVCardString = (vCardForm: FileCSVData): string => {
  return `BEGIN:VCARD
VERSION:3.0
N:${vCardForm.lastname};${vCardForm.firstname}
FN:${vCardForm.firstname} ${vCardForm.lastname}
ORG:${vCardForm.organization}
TITLE:${vCardForm.jobTitle}
ADR:;;${vCardForm.street};${vCardForm.city};${vCardForm.state};${vCardForm.postCode};${vCardForm.country}
TEL;WORK;VOICE:${vCardForm.workPhone}
TEL;CELL:${vCardForm.cellPhone}
TEL;FAX:${vCardForm.fax}
EMAIL;WORK;INTERNET:${vCardForm.email}
URL:${vCardForm.url}
END:VCARD`;
};
