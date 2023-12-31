export const fileDataStringToArraysArray = (data: string | ArrayBuffer): Array<string[]> => {

  const firstStep = String(data).replaceAll("\t", "|").split("\n");
  const secondStep = firstStep.map((el) => el.split("|"));

  return secondStep;
};


export const arraysArrayToObject = (array:Array<string[]>):{}[] => {

    const keys = array[0];
    let objects: {}[] = [];
    
    for (let i = 1; i < array.length-1; i++) {
        let record = {};
            array[i].map((el, index) => 
            record = {...record, [keys[index]]: el }
              );
        objects = [...objects, record];
}
    
    return objects;
}


export const saveToPng = (img: string, fileName: string | number) => {

  fetch("http://127.0.0.1/save-png.php", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
      img: img,
      fileName: `qr_${fileName}`,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};


export type FileCSVData = {
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

export const vCard = (vCardForm:FileCSVData):string =>{  return `BEGIN:VCARD
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
}
