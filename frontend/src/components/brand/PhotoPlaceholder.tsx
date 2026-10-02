import { ImageIcon } from "lucide-react";

/**
 * Emplacement photo en attendant les vraies images.
 * Pour mettre une photo : passer `src` (et `alt`).
 */
interface PhotoProps {
  description: string;
  src?: string;
  alt?: string;
  arche?: boolean;
  /** Affiche simplement « Photo à venir » au lieu de la description. */
  aVenir?: boolean;
  className?: string;
}

export const Photo = ({ description, src, alt, arche = false, aVenir = false, className = "" }: PhotoProps) => {
  const forme = arche ? "rounded-t-full rounded-b-2xl" : "rounded-xl";
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? description}
        className={`h-full w-full object-cover ${forme} ring-2 ring-syahi ${className}`}
        loading="lazy"
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={aVenir ? `Photo à venir : ${description}` : `Emplacement photo : ${description}`}
      className={`relative h-full w-full overflow-hidden bg-kora-2 ring-2 ring-inset ring-syahi ${forme} ${className}`}
    >
      <svg width="100%" height="100%" aria-hidden="true" className="absolute inset-0">
        <rect width="100%" height="100%" fill="url(#buta)" />
      </svg>
      {aVenir ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full bg-carte px-5 py-2 text-[15px] italic text-doux shadow-[inset_0_0_0_1.5px_hsl(var(--trait))]">
            Photo à venir
          </span>
        </div>
      ) : (
        <div className="absolute bottom-7 left-1/2 flex w-4/5 -translate-x-1/2 flex-col items-center gap-1.5 text-center text-sm text-doux">
          <ImageIcon className="h-7 w-7" aria-hidden="true" />
          <span>[Photo : {description}]</span>
        </div>
      )}
    </div>
  );
};

export default Photo;
