import redirect from 'next/navigation'
export default function ShortURLSettings({ params }) {
  return (
    <div className="h-screen">
      <div>Slug: {params.slug}</div>
    </div>
  );
}
