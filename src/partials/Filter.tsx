import ButtonPrimary from "../components/ButtonPrimary"
import ButtonSecondary from "../components/ButtonSecondary"

const Filter = () => {
  return (
    <div className="mt-[77px] flex justify-between items-center">
        {/* filters */}
        <ul className="flex justify-center items-center gap-6 p-[6px] border border-solid border-grey rounded-[10px]">
          <li className="px-[14px] py-2">რეგიონი</li>
          <li className="px-[14px] py-2">საფასო კატეგორია</li>
          <li className="px-[14px] py-2">ფართობი</li>
          <li className="px-[14px] py-2">საძინებლების რაოდენობა</li>
        </ul>

        {/* buttons */}
        <div className="flex justify-center items-center gap-4">
          <ButtonPrimary text="ლისტინგის დამატება" />
          <ButtonSecondary text="აგენტის დამატება" />
        </div>
    </div>
  )
}

export default Filter