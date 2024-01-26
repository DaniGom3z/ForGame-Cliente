import { useState, useEffect } from 'react';

const useShortPollingWithWriteGame = (url) => {
  const [popularGame, setPopularGame] = useState('');

  const fetchPopularGame = async () => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setPopularGame(data.game);
      } else {
        console.error('Error al obtener el juego popular:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Puedes establecer un estado inicial o hacer algo más en caso de error.
    }
  };

  useEffect(() => {
    fetchPopularGame();
    const pollingInterval = setInterval(() => {
      fetchPopularGame();
    }, 5000);

    return () => clearInterval(pollingInterval);
  }, [url]);

  const updatePopularGame = async (newGame) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ game: newGame }),
      });

      if (response.ok) {
        setPopularGame(newGame);
        console.log('Juego popular actualizado exitosamente.');
      } else {
        console.error('Error al actualizar el juego popular:', response.status, await response.text());
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return {
    popularGame,
    updatePopularGame,
  };
};

export default useShortPollingWithWriteGame;
