export default function MainButton({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 border border-black rounded-xl text-black text-lg hover:cursor-pointer transition ${className}`}
    >
      {text}
    </button>
    
  );
}