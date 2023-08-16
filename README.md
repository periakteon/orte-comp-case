# Orte Company Case - M. Masum Gökyüz

## Video

[![Watch the video](https://img.youtube.com/vi/kprAfs7111w/hqdefault.jpg)](https://www.youtube.com/watch?v=kprAfs7111w)

## Before You Start:

### Why didn't I choose TypeScript?

I use TypeScript in my own projects in order to detect errors that may arise in Production and to provide type-safety, but in this project I preferred JavaScript. Of course, TypeScript is actually a superset of JavaScript and therefore not independent of JavaScript, but it provides us with type-safety. But why didn't I choose TypeScript for this project? Actually, I started as a TypeScript project but then I gave up because this case was not complex enough to require type-safety. I also had to consider the possibility that the people who will run this application might not have TypeScript installed on their computers, so I went straight to JavaScript.

### Why did I choose vanilla JavaScript and DOM API instead of React?

The case you asked me for was not so complex that I needed to go into the front-end, because what it really wanted to measure was my mastery of the back-end. Also, using React would have meant running a separate "npm install" command. I love using React and the Next.js framework in my own projects and I write in React almost every day, but it would have been a bit "overkill" to choose React or any other JavaScript library for this case. For this reason, I prepared a client side with vanilla JavaScript via DOM API. Also, the fact that it was in the form of "index.html" meant that it could be easily used by dragging and dropping to the browser.

---

## Requirements

- npm
- Node.js
- Docker
- MySQL

---

## Installation

**1**. First you need to install MySQL locally via Docker (if you don't have Docker on your computer, you need to install Docker first).

After installing Docker, run the following command from the terminal:

```bash
docker run -p 3306:3306 --name my_mysql_db -e MYSQL_ROOT_PASSWORD=admin -d mysql:latest
```

**Warning**: If you already have MySQL running on port 3306, this command will throw an error. If you get an error, try a different port.

**2**. Navigate to the "server" directory and run the following command to install the required Node modules:

```bash
npm install
```

After the Node modules are installed, execute the following command in your terminal to automatically set up the local database:

```bash
node db.js
```

**3**. To start the server, run the following command:

```bash
npm run dev
```

**4**. Once the server is up and running, you can begin using the application by opening the `index.html` file.
