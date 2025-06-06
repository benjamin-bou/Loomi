import o_shape from "/images/picto/o_shape.svg";

export default function ArticlePage() {
  return (
      <div className="bg-loomibeige min-h-screen font-montserrat py-0 px-[50px] pb-20">
        {/* Titre */}
        <h1 className="text-3xl font-montserrat text-center mb-20 pt-20 text-black">
          Lorem ipsum
        </h1>

        {/* Premier bloc : texte + image à droite */}
        <div className="flex flex-col lg:flex-row gap-30 mx-[50px]">
          {/* Colonne texte */}
          <div className="flex-1 min-w-0">
            {/* Sous-titre */}
            <p className="text-xl text-black mb-12">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <h2 className="text-xl font-semibold mb-2 mt-2">Lorem Ipsum</h2>
            <p className="mb-4 text-sm leading-6 text-black">
              is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. <br /><b>Why do we use it?</b>
            </p>
            <p className="mb-0 text-sm leading-6 text-black">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>

          {/* Colonne image, visible seulement sur desktop */}
          <div className="w-full lg:w-[40vw] flex flex-col items-center mt-6 lg:mt-0">            <div className="relative w-full h-[520px] min-h-[320px] flex items-center justify-center">
              <div className="w-full h-full bg-[#d8d8d8] rounded-3xl"></div>
              <img 
                src={o_shape} 
                alt="Forme décorative" 
                className="absolute right-[-80px] bottom-[-30px] w-64 h-64 z-10"
                style={{ transform: "rotate(-90deg)" }}
              />
            </div>
          </div>
        </div>

        {/* Le reste du contenu, pleine largeur */}
        <div className="mx-[50px] mt-8">
          {/* 2e bloc d'article */}
          <h2 className="text-xl font-semibold mb-2 mt-8">Lorem Ipsum</h2>
          <p className="mb-4 text-sm leading-6 text-black">
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><b>Why do we use it?</b>
          </p>
          <p className="mb-6 text-sm leading-6 text-black">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like). It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>

          {/* 3e bloc d'article */}
          <h2 className="text-xl font-semibold mb-2 mt-8">Lorem Ipsum</h2>
          <p className="mb-4 text-sm leading-6 text-black">
            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<br /><b>Why do we use it?</b>
          </p>
          <p className="mb-6 text-sm leading-6 text-black">
            It has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </p>
        </div>
      </div>
  );
}
