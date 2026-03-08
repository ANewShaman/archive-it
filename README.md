# Archive It!

## Overview

Archive It! is an immersive, narrative-driven puzzle game set within the interface of a failing, retro-inspired operating system. As a "Data-Runner" in a post-internet world, your mission is to follow a strict protocol to upload a critical fragment of human history.

However, the archive's AI warden, "CheekyOS," a sentient but unstable system corrupted by late-stage internet culture, actively obstructs your progress. It will fight you with a series of puzzles, system malfunctions, mini-games, and mischievous taunts, creating a unique and adversarial gameplay experience all viewed through the lens of a CRT monitor.

## Gameplay Mechanics

The objective is to successfully execute a series of commands listed in the `manual_v1.txt` file on the desktop. The core gameplay loop is:

1.  **Receive Objective:** Open `archive_terminal.exe` to begin the protocol. The next required command is always found in `manual_v1.txt`.
2.  **Encounter Obstacle:** CheekyOS will introduce a system failure or puzzle that prevents the straightforward execution of the command. These can range from simple input manipulation (like using Leetspeak) to UI sabotage (like making the terminal window drift away or swarming the screen with popups).
3.  **Solve Puzzle:** Use logic, observation, and the tools on the desktop (`ascii_table.txt`, `system_status.log`, `notes.exe`, etc.) to decipher the solution and outsmart the AI.
4.  **Execute Command:** Upon entering the correct command, the protocol advances to the next step, which introduces a new, more complex challenge.

## Important Notice: Cheatsheet

If you get stuck on a puzzle and want to see the solution, all the answers are provided in the **`answers.txt`** file included with the project.

## How to Run Locally

This project is a self-contained single-page application and does not require a local server or build tools like Node.js or npm.

1.  **Download Files:** Make sure you have all the project files (`index.html`, `index.tsx`, `App.tsx`, `answers.txt`, etc.) downloaded and placed together in a single folder.
2.  **Open in Browser:** Open the `index.html` file directly in a modern web browser (such as Google Chrome, Mozilla Firefox, or Microsoft Edge).

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`

2. Run the app:
   `npm run dev`

That's it. The game should load and run directly from the local file.

## Technology Stack

*   **Framework:** React 19 (via CDN)
*   **Language:** TypeScript (transpiled in-browser by Babel Standalone)
*   **Styling:** Tailwind CSS (via CDN) and custom CSS within `index.html`.
*   **APIs:** Standard Web APIs (DOM, LocalStorage).
