export default function OverlayMessage({ type = "success", message }) {
  if (!message) return null;

  const alertClass = {
    success: "alert-success",
    error: "alert-danger",
    info: "alert-info",
  }[type] || "alert-secondary"; // fallback

  return (
    <div
      className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{
        backdropFilter: "blur(1px)",
        borderRadius: "0.5rem",
        zIndex: 10,
      }}
    >
      <div
        className={`alert ${alertClass} p-1 text-uppercase rounded shadow-lg text-center w-75`}
      >
        <p className="m-0">{message}</p>
      </div>
    </div>
  );
}