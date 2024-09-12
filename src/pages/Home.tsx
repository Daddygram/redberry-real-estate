import Filter from "../partials/Filter"
import Listing from "../partials/Listing"

const Home = () => {
  return (
    <>
        <Filter />
        <div className="mt-8 grid grid-cols-4 gap-5">
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
            <Listing />
        </div>
    </>
  )
}

export default Home