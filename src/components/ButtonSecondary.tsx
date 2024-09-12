interface ButtonSecondaryProps {
  text: string;
}

const ButtonSecondary = ({text}:ButtonSecondaryProps) => {
  return (
    <button className="py-[14px] px-4 bg-white text-red border border-solid border-red rounded-[10px]">
      {text}
    </button>
  )
}

export default ButtonSecondary