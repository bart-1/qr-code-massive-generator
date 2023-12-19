import { ChangeEvent, useCallback, useRef, useState } from "react";
import QRCode from "react-qr-code";
// import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";

const App = () => {
  const [text, setText] = useState("");
  const [generateCode, setGenerateCode] = useState("");

  const handleGenerate = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGenerateCode(text);
    onButtonClick;
  };

  const ref = useRef<HTMLDivElement>(null);

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <div>
      <h1>Input: {text}</h1>
      <p>Start editing to see some magic happen :)</p>

      <form onSubmit={handleGenerate}>
        {" "}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
        ></input>
        <button type="submit"> generuj</button>
      </form>
      <div ref={ref}>
        <QRCode value={generateCode} size={400} />
      </div>

      <button onClick={onButtonClick}> generuj</button>
    </div>
  );
};


export default App;
