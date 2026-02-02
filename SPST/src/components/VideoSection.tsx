export function VideoSection() {
  return (
    <div className="w-full">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/BJKZDZh3HI8"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
