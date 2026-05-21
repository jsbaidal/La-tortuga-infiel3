// PokemonCard.jsx
function PokemonCard({ nombre, imagen, numero, tipo }) {
  // Formatea el número del Pokémon con # y tres dígitos (ej: #001)
  const numeroFormateado = `#${String(numero).padStart(3, "0")}`;

  return (
    <div className="relative bg-red-600 rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg h-full flex flex-col">
      {/* Fondo blanco decorativo (opcional, acentúa el rojo con blanco) */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

      <div className="flex flex-col items-center p-4 flex-grow">
        {/* Contenedor de la imagen con fondo blanco y forma circular */}
        <div className="bg-white rounded-full p-2 mb-3 shadow-md">
          <img
            src={imagen}
            alt={nombre}
            className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
          />
        </div>

        {/* Nombre del Pokémon */}
        <h2 className="text-lg font-bold text-white capitalize mb-2 text-center">
          {nombre}
        </h2>

        {/* Contenedor inferior: tipo a la izquierda, número a la derecha */}
        <div className="flex justify-between items-center w-full mt-auto">
          <span className="bg-white text-red-600 rounded-full px-3 py-1 text-xs font-semibold uppercase">
            {tipo}
          </span>
          <span className="text-white font-mono font-bold text-sm">
            {numeroFormateado}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
