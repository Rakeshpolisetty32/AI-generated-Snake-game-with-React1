
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  
  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isPaused, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    if (!isGameOver && !isPaused) {
      gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isGameOver, isPaused, moveSnake]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full px-4 mb-2">
        <div className="border-2 border-magenta-500 p-2 bg-black">
          <span className="text-xl font-bold glitch-hard text-cyan-400 font-pixel tracking-tighter">
            DATA_VAL: {score.toString().padStart(6, '0')}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-xs font-pixel ${isPaused ? 'animate-pulse text-cyan-400' : 'text-magenta-500'}`}>
            {isGameOver ? 'CORE_DUMP' : isPaused ? 'HALTED' : 'RUNNING'}
          </span>
          <span className="text-[8px] text-cyan-400/50 font-mono">ENCRYPT_LVL_9</span>
        </div>
      </div>
      
      <div 
        className="relative neon-border bg-black/80 overflow-hidden"
        style={{ 
          width: GRID_SIZE * 20, 
          height: GRID_SIZE * 20,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, #00f3ff 1px, transparent 1px), linear-gradient(to bottom, #00f3ff 1px, transparent 1px)',
               backgroundSize: '20px 20px'
             }} 
        />

        {/* Snake segments */}
        {snake.map((segment, i) => (
          <div 
            key={i}
            className="absolute bg-cyan-400 shadow-[0_0_8px_#00f3ff]"
            style={{
              width: 18,
              height: 18,
              left: segment.x * 20 + 1,
              top: segment.y * 20 + 1,
              transition: 'all 0.1s linear',
              zIndex: 10,
              opacity: 1 - (i / snake.length) * 0.5
            }}
          />
        ))}

        {/* Food */}
        <div 
          className="absolute bg-magenta-500 shadow-[0_0_12px_#ff00ff] animate-pulse"
          style={{
            width: 14,
            height: 14,
            left: food.x * 20 + 3,
            top: food.y * 20 + 3,
            borderRadius: '50%',
            zIndex: 5
          }}
        />

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/95 z-20 screen-tear">
            <h2 className="text-3xl font-pixel glitch-hard text-magenta-500 mb-6">FATAL_ERROR</h2>
            <button 
              onClick={resetGame}
              className="px-8 py-4 border-4 border-cyan-400 text-cyan-400 font-pixel hover:bg-cyan-400 hover:text-black transition-all uppercase"
            >
              RE_INITIALIZE
            </button>
          </div>
        )}

        {isPaused && !isGameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10 backdrop-invert">
            <button 
              onClick={() => setIsPaused(false)}
              className="px-8 py-4 border-4 border-magenta-500 text-magenta-500 font-pixel hover:bg-magenta-500 hover:text-black transition-all uppercase"
            >
              RESUME_EXEC
            </button>
          </div>
        )}
      </div>

      <div className="text-[10px] opacity-50 text-center uppercase">
        [ARROWS] TO STEER // [SPACE] TO PAUSE
      </div>
    </div>
  );
};
