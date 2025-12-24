# Plan: Bingo com FastAPI no Render

Criar aplicação fullstack com **FastAPI + WebSocket nativo + PostgreSQL + React**, hospedada em 1 serviço no Render. FastAPI serve API REST, WebSocket para tempo real, e arquivos estáticos do React buildado.

## Steps

1. **Setup FastAPI com WebSocket:** Criar `backend/main.py` com FastAPI + endpoint `/ws` usando `WebSocket`, `ConnectionManager` para gerenciar conexões ativas, SQLAlchemy async para PostgreSQL, e `requirements.txt` com `fastapi`, `uvicorn[standard]`, `sqlalchemy`, `asyncpg`, `websockets`

2. **Criar models e rotas REST:** Definir models SQLAlchemy para `Prize`, `GameState`, `CardPrice` em `backend/models.py`, criar rotas REST em `backend/routes.py` (`GET /api/prizes`, `POST /api/prizes`, `GET /api/game-state`, `POST /api/draw-ball`), e configurar PostgreSQL via `DATABASE_URL`

3. **Implementar broadcast WebSocket:** Criar `backend/websocket.py` com `ConnectionManager` que mantém lista de conexões ativas, implementar método `broadcast()` para enviar mensagens a todos os clientes conectados, e integrar com rotas para emitir eventos `ball_drawn`, `prize_delivered` quando admin fizer ações

4. **Desenvolver frontend React com WebSocket nativo:** Criar custom hook `useWebSocket` que conecta ao `ws://your-app.onrender.com/ws`, páginas `Home.jsx`, `Live.jsx` (escuta mensagens WebSocket e atualiza estado), `Admin.jsx` (envia comandos via WebSocket e chama API REST), e configurar build para `backend/static/`

5. **Deploy no Render:** Criar `render.yaml` com Web Service, build commands (`cd frontend && npm install && npm run build && mv dist ../backend/static && cd ../backend && pip install -r requirements.txt`), start command `uvicorn main:app --host 0.0.0.0 --port $PORT`, adicionar PostgreSQL database, e push no GitHub

## Further Considerations

1. **Reconnection automática?** WebSocket nativo não reconecta automaticamente. Implementar lógica de reconexão no frontend ou usar biblioteca `reconnecting-websocket` (~2KB)?

2. **SQLAlchemy async vs sync?** FastAPI funciona melhor com async, mas SQLAlchemy async é mais complexo. Para simplicidade, usar SQLAlchemy **sync** com `run_in_executor` é aceitável e mais fácil?

3. **Alternativa: Usar Socket.IO no FastAPI?** Existe `python-socketio` que funciona com FastAPI, mantendo compatibilidade com Socket.IO client no React. Seria mais familiar vindo de Flask, mas adiciona complexidade. **Recomendo WebSocket nativo** pela simplicidade
