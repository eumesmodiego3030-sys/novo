const VideoSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        onError={() => console.log("Erro ao carregar vídeo - arquivo pode ser muito grande ou incompatível")}
      >
        <source src="/clinic-tour.mp4" type="video/mp4" />
        Seu navegador não suporta tag de vídeo.
      </video>
    </section>
  );
};

export default VideoSection;
