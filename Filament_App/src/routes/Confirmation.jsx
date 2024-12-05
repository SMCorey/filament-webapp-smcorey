import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();

  const handleReturnToShopping = () => {
    navigate('/'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Purchase Complete!</h1>
      <p>Thank you for shopping at Filaments Express!</p>
      <button
        onClick={handleReturnToShopping}
        className="btn btn-primary mt-4"
      >
        Return to Shopping
      </button>
    </div>
  );
}
