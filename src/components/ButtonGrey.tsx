interface ButtonGreyProps {
    text: string;
  }
  
  const ButtonGrey = ({text}:ButtonGreyProps) => {
    return (
      <button className="p-[10px] bg-white text-darkGrey border border-solid border-darkGrey rounded-lg">
        {text}
      </button>
    )
  }
  
  export default ButtonGrey