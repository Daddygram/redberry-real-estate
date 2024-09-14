interface ButtonSecondaryProps {
  text: string;
  onClick?: () => void; // Added onClick prop, optional
  type?: "submit" | "reset" | "button";
}

const ButtonSecondary = ({ text, onClick, type = "button" }: ButtonSecondaryProps) => {
  return (
    <button
      type={type}
      className="py-[14px] px-4 bg-white text-redPrimary border border-solid border-redPrimary rounded-[10px]"
      onClick={onClick} // Added onClick event handler
    >
      {text}
    </button>
  );
}

export default ButtonSecondary;
