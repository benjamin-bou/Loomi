export default function ProfileCard({ title, children }) {
  return (
    <div className="bg-transparent border border-black rounded-[2rem] p-8 min-h-[200px] w-full sm:w-[350px] flex flex-col mb-2 cursor-pointer">
      <div>
        <h3 className="text-2xl font-semibold mb-2 relative">
          {title}
          <span className="block w-16 h-[2px] bg-[#d63d87] mt-2"></span>
        </h3>
      </div>
      <p className="text-base text-gray-800">{children}</p>
    </div>
  );
}