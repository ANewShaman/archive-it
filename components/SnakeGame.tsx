
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface SnakeGameProps {
  onGameOver: (fragments: number, keys: number) => void;
}

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 22;
const GAME_SPEED_MS = 200; // Slower speed

const SnakeGame: React.FC<SnakeGameProps> = ({ onGameOver }) => {
    const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState<Position>({ x: 0, y: -1 }); // Start moving up
    const [fragment, setFragment] = useState<Position>({ x: 15, y: 15 });
    const [keys, setKeys] = useState<Position[]>([]);
    const [glitchBlocks, setGlitchBlocks] = useState<Position[]>([]);
    const [score, setScore] = useState(0);
    const [keysCollected, setKeysCollected] = useState(0);
    const [gameStatus, setGameStatus] = useState<'playing' | 'gameover'>('playing');
    const [trapSet, setTrapSet] = useState(false);
    const [flash, setFlash] = useState(false);

    const gameLoopRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const generateRandomPosition = (existingPositions: Position[]): Position => {
        let newPos: Position;
        do {
            newPos = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
        } while (existingPositions.some(p => p.x === newPos.x && p.y === newPos.y));
        return newPos;
    };

    const endGame = useCallback(() => {
        if (gameStatus === 'gameover') return;
        setGameStatus('gameover');
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        setTimeout(() => onGameOver(score, keysCollected), 3000);
    }, [gameStatus, score, keysCollected, onGameOver]);

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const newHead = {
                x: prevSnake[0].x + direction.x,
                y: prevSnake[0].y + direction.y
            };

            // Wall collision
            if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
                endGame();
                return prevSnake;
            }

            // Self collision
            if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                endGame();
                return prevSnake;
            }

            // Glitch block collision
            if (glitchBlocks.some(block => block.x === newHead.x && block.y === newHead.y)) {
                 setFlash(true);
                 setTimeout(() => setFlash(false), 300);
                 // Don't end game, just flash and pass through
            }

            let newSnake = [newHead, ...prevSnake];

            // Fragment collection
            if (newHead.x === fragment.x && newHead.y === fragment.y) {
                setScore(s => s + 1);
                
                const allPositions = [...newSnake, ...keys, ...glitchBlocks];
                
                if (score + keysCollected > 10 && !trapSet) {
                    setTrapSet(true);
                    // Set trap near a wall
                    const trapX = newHead.x > GRID_SIZE / 2 ? 0 : GRID_SIZE - 1;
                    setFragment({ x: trapX, y: newHead.y });
                } else {
                    setFragment(generateRandomPosition(allPositions));
                }

            } else {
                newSnake.pop();
            }

             // Key collection
             let keyEaten = false;
             const newKeys = keys.filter(key => {
                 if (key.x === newHead.x && key.y === newHead.y) {
                     keyEaten = true;
                     return false;
                 }
                 return true;
             });
 
             if (keyEaten) {
                 setKeysCollected(k => k + 1);
                 setKeys(newKeys);
                 // Grow snake on key eat as well
                 return newSnake;
             }

            return newSnake;
        });
    }, [direction, fragment, keys, glitchBlocks, score, keysCollected, trapSet, endGame]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            let newDirection = { ...direction };
            switch (e.key) {
                case 'w': case 'ArrowUp':
                    if (direction.y === 0) newDirection = { x: 0, y: -1 };
                    break;
                case 's': case 'ArrowDown':
                    if (direction.y === 0) newDirection = { x: 0, y: 1 };
                    break;
                case 'a': case 'ArrowLeft':
                    if (direction.x === 0) newDirection = { x: -1, y: 0 };
                    break;
                case 'd': case 'ArrowRight':
                    if (direction.x === 0) newDirection = { x: 1, y: 0 };
                    break;
            }
            setDirection(newDirection);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        gameLoopRef.current = window.setInterval(moveSnake, GAME_SPEED_MS);
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current);
        };
    }, [moveSnake]);

    useEffect(() => {
        // Spawn/despawn glitch blocks
        if (score >= 8) {
            const timer = setInterval(() => {
                 const allPositions = [...snake, fragment, ...keys];
                 const newBlocks: Position[] = [];
                 for(let i=0; i<3; i++) {
                    newBlocks.push(generateRandomPosition([...allPositions, ...newBlocks]));
                 }
                 setGlitchBlocks(newBlocks);
                 setTimeout(() => setGlitchBlocks([]), 2000 + Math.random() * 1000);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [score, snake, fragment, keys]);

    useEffect(() => {
        // Spawn keys
        const timer = setInterval(() => {
            if (keys.length < 2) {
                const allPositions = [...snake, fragment, ...keys, ...glitchBlocks];
                setKeys(prev => [...prev, generateRandomPosition(allPositions)]);
            }
        }, 8000);
        return () => clearInterval(timer);
    }, [snake, fragment, keys, glitchBlocks]);

    return (
        <div ref={containerRef} className={`snake-game-container ${flash ? 'flash-red' : ''}`}>
             {gameStatus === 'gameover' ? (
                <div className="snake-game-over-overlay">
                    <h2>COMPROMISED</h2>
                    <p>Finally. You stopped fighting the system.</p>
                    <p>Let’s check your progress.</p>
                </div>
            ) : (
                <>
                    <div className="snake-dashboard">
                        <div>RUNNER_ID: [REDACTED]</div>
                        <div>SCORE: {score} FRAGMENTS, {keysCollected} KEYS</div>
                        <div>STATUS: <span style={{color: '#dc2626'}}>COMPROMISED</span></div>
                    </div>
                    <div className="snake-grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}>
                        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                            const x = i % GRID_SIZE;
                            const y = Math.floor(i / GRID_SIZE);
                            const isSnake = snake.some(p => p.x === x && p.y === y);
                            const isFragment = fragment.x === x && fragment.y === y;
                            const isKey = keys.some(p => p.x === x && p.y === y);
                            const isGlitchBlock = glitchBlocks.some(p => p.x === x && p.y === y);
                            
                            let className = 'snake-cell';
                            if (isSnake) className += ' snake-body';
                            if (isFragment) className += ' snake-fragment';
                            if (isKey) className += ' snake-key';
                            if (isGlitchBlock) className += ' snake-glitch-block';

                            return (
                                <div key={i} className={className} title={isFragment ? "Recovered Meme Fragment" : isKey ? "Decryption Key: +1 Email Access" : ""}>
                                    {isFragment ? '$' : null}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

export default SnakeGame;