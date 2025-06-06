export default function ProfileCard({ title, onClick, children }) {
  return (
    <div
    onClick={onClick} 
    className="bg-transparent border-[1.5px] border-black hover:border-loomipink rounded-[2rem] p-8 min-h-[200px] w-full sm:w-[350px] flex flex-col mb-2 cursor-pointer transition-colors">
      <div>
        <h3 className="!text-xl font-semibold mb-2 relative">
          {title}
          <span className="block w-16 h-[2px] bg-[#d63d87] mt-2"></span>
        </h3>
      </div>
      <p className="text-base text-gray-800">{children}</p>
    </div>
  );
}