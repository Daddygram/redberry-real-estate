interface ButtonPrimaryProps {
  text: string;
}

const ButtonPrimary = ({text}:ButtonPrimaryProps) => {
  return (
    <button className="py-[14px] px-4 bg-red text-white rounded-[10px]">
      {text}
    </button>
  )
}

export default ButtonPrimary