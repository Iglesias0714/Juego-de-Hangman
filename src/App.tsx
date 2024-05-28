import { useState, useEffect } from 'react';
import Hangman from "./components/Hangman";
import Welcome from "./components/Welcome";

type WordCategories = {
  [key: string]: {
    words: string[];
    hints: Record<string, string>;
  };
};

const wordCategories: WordCategories = {
  paisesDeAmerica: {
    words: ['estadosunidos', 'canada', 'brasil', 'argentina', 'mexico', 'colombia'],
    hints: {
      estadosunidos: 'El país más poderoso del continente, conocido por su diversidad cultural y sus ciudades emblemáticas como Nueva York y Los Ángeles',
      canada: 'Un país conocido por su impresionante belleza natural, como las Cataratas del Niágara y las Montañas Rocosas',
      brasil: 'El país más grande de América del Sur, conocido por su selva amazónica, sus playas y el Carnaval de Río de Janeiro',
      argentina: 'Un país famoso por el tango, el fútbol y la belleza de la Patagonia',
      mexico: 'Un país rico en historia y cultura, conocido por sus antiguas ruinas, sus playas y su deliciosa comida',
      colombia: 'Un país megadiverso con paisajes que van desde playas tropicales hasta montañas nevadas, conocido por su café y su gente amable'
    }
  },
  generosLiterarios: {
    words: ['novela', 'poesia', 'ensayo', 'drama', 'cienciaficcion', 'thriller'],
    hints: {
      novela: 'Un género literario que narra historias ficticias o basadas en hechos reales, con personajes complejos y tramas elaboradas',
      poesia: 'Un género que utiliza la belleza del lenguaje para expresar sentimientos, emociones y pensamientos de manera artística',
      ensayo: 'Un texto en prosa en el que un autor analiza, interpreta o evalúa un tema de manera argumentativa y reflexiva',
      drama: 'Un género literario que presenta conflictos emocionales y situaciones intensas, con personajes complejos y relaciones tensas',
      cienciaficcion: 'Un género que imagina futuros posibles, mundos alternativos y avances tecnológicos, a menudo con temas científicos o sociales',
      thriller: 'Un género que busca provocar emociones intensas en el lector, a menudo con tramas llenas de suspense y giros inesperados'
    }
  },
  deportesOlimpicos: {
    words: ['atletismo', 'natacion', 'gimnasia', 'esgrima', 'ciclismo', 'halterofilia'],
    hints: {
      atletismo: 'Un deporte que incluye una variedad de disciplinas como carreras, saltos y lanzamientos, que requieren fuerza, velocidad y resistencia',
      natacion: 'Un deporte que se practica en el agua y que incluye distintas modalidades como estilo libre, espalda, pecho y mariposa',
      gimnasia: 'Un deporte que combina movimientos acrobáticos, equilibrio y flexibilidad, en modalidades como suelo, barras asimétricas y barra fija',
      esgrima: 'Un deporte de combate que utiliza armas blancas, como espadas, sables y floretes, y que se practica en duelos uno contra uno',
      ciclismo: 'Un deporte que incluye distintas modalidades como ruta, pista, montaña y BMX, que requieren resistencia, velocidad y habilidad técnica',
      halterofilia: 'Un deporte que consiste en levantar pesas en dos movimientos, el arrancar y el envión, y que requiere fuerza, técnica y concentración'
    }
  },
  comidasTipicas: {
    words: ['hamburguesa', 'sushi', 'pizza', 'tacos', 'pasta'],
    hints: {
      hamburguesa: 'Un plato que consiste en una carne molida de res o pollo, cocinada a la parrilla o a la plancha, y servida en un pan con distintos acompañamientos',
      sushi: 'Un plato japonés que consiste en arroz sazonado con vinagre y combinado con pescado crudo o mariscos',
      pizza: 'Un plato italiano que consiste en una base de masa de pan, cubierta con salsa de tomate, queso y otros ingredientes como pepperoni, champiñones o jamón',
      tacos: 'Un plato mexicano que consiste en una tortilla de maíz o harina rellena de carne, pescado o verduras',
      pasta: 'Un plato italiano que incluye una variedad de formas de masa con salsas como marinara, alfredo o pesto'
    }
  }
};

function App() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (currentCategory) {
      setStartTime(Date.now());
      setTimeLeft(60);
    }
  }, [currentCategory]);
  
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(60 - Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentCategory) {
      alert("¡Tiempo agotado!");
      setCurrentCategory(null);
    }
  }, [timeLeft, startTime, currentCategory]);

  const selectRandomCategory = () => {
    const categories = Object.keys(wordCategories);
    const randomIndex = Math.floor(Math.random() * categories.length);
    setCurrentCategory(categories[randomIndex]);
  };

  return (
    <div className="App">
      <Welcome />
      <div className="container">
        {currentCategory ? (
          <div className="category-animation">
            <h1>{currentCategory}</h1>
            <p>Tiempo transcurrido: {60 - timeLeft} segundos</p>
            <p>Tiempo restante: {timeLeft} segundos</p>
            <Hangman
              words={wordCategories[currentCategory].words}
              hints={wordCategories[currentCategory].hints}
            />
          </div>
        ) : (
          <button onClick={selectRandomCategory}>Seleccionar categoría aleatoria</button>
        )}
      </div>
    </div>
  );
}

export default App;
