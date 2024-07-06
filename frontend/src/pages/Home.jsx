import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <button
        onClick={() => {
          navigate("/code");
        }}
      >
        Click here
      </button>
    </div>
  );
};

export default Home;
