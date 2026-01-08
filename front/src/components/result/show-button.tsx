import { SetStateAction } from "react";

interface ShowButtonProps {
  text: string;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}

export function ShowButton({ text, show, setShow }: ShowButtonProps) {
  return (
    <button
      onClick={() => setShow(!show)}
      className="text-left text-sm text-gray-500 hover:text-gray-700"
    >
      {show ? "Hide" : "Show"} {text}
    </button>
  );
}
