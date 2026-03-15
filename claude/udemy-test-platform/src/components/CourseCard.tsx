import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  description: string | null;
  thumbnailUrl: string | null;
  videoCount: number;
};

export default function CourseCard({
  id,
  title,
  description,
  thumbnailUrl,
  videoCount,
}: Props) {
  return (
    <Link href={`/courses/${id}`} className="group block rounded-xl overflow-hidden border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-video w-full bg-zinc-100">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
            No Image
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-zinc-900 text-base leading-snug line-clamp-2 mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-zinc-500 line-clamp-2 mb-3">
            {description}
          </p>
        )}
        <span className="text-xs text-zinc-400 font-medium">
          {videoCount}本の動画
        </span>
      </div>
    </Link>
  );
}
