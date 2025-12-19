import { useSearchParams } from "react-router-dom";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import * as htmlToImage from "html-to-image";

interface MemeText {
  id: number;
  text: string;
  x: number;
  y: number;
}

const Edit = () => {
  const [params] = useSearchParams();
  const url = params.get("url") || "https://i.imgflip.com/1bij.jpg"; // запасная картинка
  const memeRef = useRef<HTMLDivElement>(null);
  const [texts, setTexts] = useState<MemeText[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Добавление нового текста
  const addText = () => {
    if (!inputValue) return;
    setTexts([...texts, { id: Date.now(), text: inputValue, x: 50, y: 50 }]);
    setInputValue("");
  };

  // Перетаскивание текста
  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    const offsetX = e.clientX - (texts.find(t => t.id === id)?.x || 0);
    const offsetY = e.clientY - (texts.find(t => t.id === id)?.y || 0);

    const move = (ev: MouseEvent) => {
      setTexts(prev =>
        prev.map(t =>
          t.id === id ? { ...t, x: ev.clientX - offsetX, y: ev.clientY - offsetY } : t
        )
      );
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  // Скачивание мемa
  const downloadMeme = async () => {
    if (!memeRef.current) return;

    const dataUrl = await htmlToImage.toJpeg(memeRef.current, { quality: 0.95, width: 500 });
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "meme.jpg";
    link.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Edit Meme</h1>

      {/* Ввод текста */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Введите текст"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <Button variant="primary" onClick={addText} style={{ marginLeft: "5px" }}>
          Добавить текст
        </Button>
      </div>

      {/* Мем с текстами */}
      <div
        ref={memeRef}
        style={{ position: "relative", display: "inline-block", width: "500px" }}
      >
        <img src={url} width="500" alt="meme" />
        {texts.map(t => (
          <h2
            key={t.id}
            style={{
                position: "absolute",
                left: t.x,
                top: t.y,
                cursor: "grab",
                color: "black",   // чёрный
                textShadow: "none", // убрать тень
                userSelect: "none",
            }}
            onMouseDown={e => handleMouseDown(e, t.id)}
          >
            {t.text}
          </h2>
        ))}
      </div>

      {/* Скачать мем */}
      <div style={{ marginTop: "20px" }}>
        <Button variant="success" onClick={downloadMeme}>
          Download meme
        </Button>
      </div>
    </div>
  );
};

export default Edit;
