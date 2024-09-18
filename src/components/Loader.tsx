import { Circles } from "react-loader-spinner"

export const Loader = () => {
  return (
    <Circles height="80" width="80" color="red" ariaLabel="loading" wrapperClass='absolute w-full h-full flex justify-center items-center' />
  )
}
