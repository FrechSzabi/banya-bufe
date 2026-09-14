/**
 * Kép, amely hiányzó forrás esetén brandelt, csíkos placeholdert mutat.
 * (Lásd: src/assets/index.js – a fotókat a src/assets/photos mappába kell tenni.)
 */
export default function PhotoFrame({ src, alt, className = '', imgClassName = '', loading = 'lazy' }) {
  if (!src) {
    return (
      <div role="img" aria-label={alt} className={`relative overflow-hidden bg-ink ${className}`}>
        <div className="stripes absolute inset-0 opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <span className="absolute bottom-3 left-3 font-condensed text-xs uppercase tracking-widest text-ash">
          Fotó helye
        </span>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-ink ${className}`}>
      <img src={src} alt={alt} loading={loading} className={`h-full w-full object-cover ${imgClassName}`} />
    </div>
  );
}
