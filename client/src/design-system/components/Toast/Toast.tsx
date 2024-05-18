import toast from "react-simple-toasts";

export default function Toast({ status, text }: { status: any; text: any }) {
  return toast(
    <div
      style={{
        backgroundColor: status === "success" ? "#00AFAF" : "#E78895",
        padding: "1rem",
        color: "white",
        border: "none",
        borderRadius: ".5rem",
      }}
    >
      {text}
    </div>,
    {
      position: "top-right",
    }
  );
}
