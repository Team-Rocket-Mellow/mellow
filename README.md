# About Mellow
Mellow is a todo app with a focus on (1) "offline-first" or local persistence, 
(2) synchronization, and (3) undo / redo.

| name       | description           | location
| ---------- | --------------------- | ---------
| React      | DOM library           | client
| Recoil     | state management      | client
| Tailwind   | CSS utility           | client
| Node       | server runtime        | server
| Fastify    | http library          | server
| PostgreSQL | database              | server
| Vite       | build system & server | client & server
| Nanoid     | unique ID generator   | client & server
| Yjs        | CRDT                  | client & server
| TypeScript | type verification     | client & server

# Requirements
- Node v18
- PostgreSQL v14

# Installation
1. Clone the repository.
   ```
   git clone git@github.com:minseo/mellow.git
   ```
2. Navigate to the project folder.
   ```
   cd mellow
   ```
3. Install dependencies.
   ```bash
   npm i
   ```

# Frontend Workflow
1. Navigate to the folder and start your VSC.
   ```bash
   code .
   ```

2. Start frontend server.
   ```bash
   npm run dev
   ```