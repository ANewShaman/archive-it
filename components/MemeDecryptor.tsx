import React, { useState, useEffect, useRef } from 'react';

const GRID_SIZE = 4;
const TARGET_ROW = ['1', '3', '3', '7'];
const TIME_LIMIT = 45; // Increased from 30

// Helper to create a shuffled grid that is solvable
const createShuffledGrid = (): string[][] => {
    const solvedGrid = Array(GRID_SIZE).fill(null).map(() => [...TARGET_ROW]);
    
    // Flatten, shuffle, and then un-flatten
    const flatGrid = solvedGrid.flat();
    for (let i = flatGrid.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flatGrid[i], flatGrid[j]] = [flatGrid[j], flatGrid[i]];
    }

    const shuffledGrid: string[][] = [];
    while(flatGrid.length) shuffledGrid.push(flatGrid.splice(0, GRID_SIZE));

    // Ensure it's not already solved
    const isAlreadySolved = shuffledGrid.every((row) => row.join('') === TARGET_ROW.join(''));
    if (isAlreadySolved) {
        return createShuffledGrid(); // Recurse if it's already solved by chance
    }
    
    return shuffledGrid;
};


interface MemeDecryptorProps {
    onComplete: () => void;
    onFailure: () => void;
}

export const MemeDecryptor: React.FC<MemeDecryptorProps> = ({ onComplete, onFailure }) => {
    const [grid, setGrid] = useState<string[][]>(createShuffledGrid());
    const [selectedTile, setSelectedTile] = useState<{ row: number, col: number } | null>(null);
    const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
    const [isSolved, setIsSolved] = useState(false);
    
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    onFailure();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [onFailure]);
    
    useEffect(() => {
        const checkWin = () => {
            const solved = grid.every(row => row.join('') === TARGET_ROW.join(''));
            if (solved) {
                setIsSolved(true);
                if (timerRef.current) clearInterval(timerRef.current);
                setTimeout(onComplete, 1000);
            }
        };
        checkWin();
    }, [grid, onComplete]);

    const handleTileClick = (row: number, col: number) => {
        if (isSolved) return;

        if (selectedTile) {
            if(selectedTile.row === row && selectedTile.col === col) {
                setSelectedTile(null);
                return;
            }
            // Swap tiles
            const newGrid = grid.map(r => [...r]);
            const temp = newGrid[selectedTile.row][selectedTile.col];
            newGrid[selectedTile.row][selectedTile.col] = newGrid[row][col];
            newGrid[row][col] = temp;
            setGrid(newGrid);
            setSelectedTile(null);
        } else {
            // Select tile
            setSelectedTile({ row, col });
        }
    };
    
    return (
        <div className="meme-decryptor-container">
            <div className="decryptor-status">
                {isSolved ? "DECRYPTION COMPLETE!" : "ALIGN ROWS TO [1 3 3 7]"}
            </div>
            <div className="decryptor-timer" style={{ color: timeLeft <= 5 ? '#ff0000' : '#ff0040' }}>
                TIME: {timeLeft}s
            </div>
            <div className="decryptor-grid">
                {grid.map((row, rowIndex) => 
                    row.map((tile, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`decryptor-tile ${selectedTile?.row === rowIndex && selectedTile?.col === colIndex ? 'selected' : ''}`}
                            onClick={() => handleTileClick(rowIndex, colIndex)}
                        >
                            {tile}
                        </div>
                    ))
                )}
            </div>
             <div className="decryptor-status">
                {isSolved ? "Meme matrix stabilized..." : "Click two tiles to swap them."}
            </div>
        </div>
    );
};