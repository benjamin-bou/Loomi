export default function MainButton({ text, onClick, className, disabled = false }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`px-4 xs:!px-6 py-2 xs:!py-2 border border-black rounded-lg xs:!rounded-xl text-black text-sm xs:!text-base md:!text-lg transition ${
        disabled 
          ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400 border-gray-300' 
          : 'hover:cursor-pointer'
      } ${className}`}
    >
      {text}
    </button>
    
  );
}