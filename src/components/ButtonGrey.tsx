interface ButtonGreyProps {
    text: string;
    onClick?: () => void;
    type?: "submit" | "reset" | "button";
  }
  
  const ButtonGrey = ({text, type = "button", onClick}:ButtonGreyProps) => {
    return (
      <button 
      type={type}
      className="p-[10px] bg-white text-darkGrey border border-solid border-darkGrey rounded-lg"
      onClick={onClick}>
        {text}
      </button>
    )
  }
  
  export default ButtonGrey