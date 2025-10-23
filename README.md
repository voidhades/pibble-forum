# React Forum (Vite + Bootstrap)

Prosty forumowy projekt (klient) z lokalną autoryzacją i CRUD dla wpisów.  
Dane (użytkownicy, sesja, posty) są przechowywane w `localStorage`.

## Co zawiera
- React + Vite
- Bootstrap 5
- React Router
- AuthContext (lokalna autoryzacja)
- PostsContext (CRUD, localStorage)
- Możliwość dodawania / edytowania / usuwania własnych postów. Admin (`admin`/`admin`) może edytować/usunąć wszystkie posty.

## Uruchomienie lokalnie

1. Rozpakuj katalog i przejdź do folderu:
```bash
cd react-forum-vite
```

2. Zainstaluj zależności:
```bash
npm install
```

3. Uruchom serwer deweloperski:
```bash
npm run dev
```

## Deploy
To prosty client-only projekt. Możesz wdrożyć na GitHub Pages, Netlify lub Vercel.  
Dodaj repo na GitHubie i push — Netlify/Vercel zwykle deployują automatycznie z main.

## Uwagi
- To prosty przykład edukacyjny — hasła są przechowywane w localStorage w postaci jawnej (niebezpieczne dla produkcji).
- Jeśli chcesz, mogę pomóc dodać backend (Express / Supabase / Firebase) albo podłączyć autoryzację z JWT.

