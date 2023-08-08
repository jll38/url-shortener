export default function ShortURL({ children }) {
  return (
    <>
      <div className="w-[300px] bg-payne-gray text-peach py-4 px-2 mt-4 rounded-xl">
        <div className="text-center bg-moonstone mx-2 py-2 rounded-lg">
          <div className="font-semibold text-[1.5em]">
            Your TinyClicks URL is:
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
