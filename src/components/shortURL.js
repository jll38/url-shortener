export default function ShortURL({children}) {
  return (
    <>
      <div>
        <div>Your TinyClick URL is:</div>
        <div>{children}</div>
      </div>
    </>
  );
}
