export default function Refresh() {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark fade-in" style={{ zIndex: 2000 }}>
      <div className="spinner-border text-light spinner-border-sm" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
