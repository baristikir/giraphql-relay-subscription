# GiraphQL + React-Relay - Subscription Example

This repo contains a minimal client-server setup as showcase.

### 🏷️ Usage

Install dependencies:

```bash
yarn
```

The server setup is inside a docker container, it also contains a PostgreSQL database which is coupled with the backend. It is used for the graphql mutation & subscription.

```bash
yarn dev:server
```

The client just contains a boilerplate Vite + React setup with `react-relay`. To start the client dev server just run:

```bash
yarn dev:web
```
