import { ClipLoader } from "react-spinners";

function Spinner({loading}) {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  return (
     <ClipLoader
        color={'#e50914'}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
  )
}

export default Spinner
