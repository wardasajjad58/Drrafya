import { useParams, Link } from "react-router-dom";

export default function JourneyDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white p-10">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="font-bold text-[var(--rich-pink)]">
          ← Back
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold text-black">
          Journey: {id}
        </h1>

        <p className="mt-3 text-black/60 font-medium">
          Ab yahan {id} ka detail content show karna hai.
        </p>
      </div>
    </div>
  );
}
