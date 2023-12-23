export const saveToPng = (img: string) => {
  fetch("http://127.0.0.1/save-png.php", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({
        img: img,
        fileName: "qr_"
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};
