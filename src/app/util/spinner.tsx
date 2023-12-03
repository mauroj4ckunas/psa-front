export function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 opacity-50"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid z-10"></div>
    </div>
  );
}
