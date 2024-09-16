interface ButtonPrimaryProps {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

const ButtonPrimary = ({ text, type = "button", onClick }: ButtonPrimaryProps) => {
  return (
    <button 
      type={type} 
      className="py-[14px] px-4 bg-redPrimary text-white rounded-[10px]"
      onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonPrimary;