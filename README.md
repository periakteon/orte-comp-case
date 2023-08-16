# Orte Company Case - M. Masum Gökyüz

## Requirements

- npm
- Node.js
- Docker
- MySQL

## Installation

1. First you need to install MySQL locally via Docker (if you don't have Docker on your computer, you need to install Docker first).

After installing Docker, run the following command from the terminal:

```bash
docker run -p 3306:3306 --name my_mysql_db -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest
```

2. Navigate to the "server" directory and run the following command to install the required Node modules:

```bash
npm install
```

After the Node modules are installed, execute the following command in your terminal to automatically set up the local database:

```bash
node db.js
```

3. To start the server, run the following command:

```bash
npm run dev
```

4. Once the server is up and running, you can begin using the application by opening the `index.html` file.
