const app = require("./app");

const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;  // Retourne la valeur d'origine si ce n'est pas un nombre
    }
    if (port >= 0) {
      return port;  // Retourne le port si c'est un nombre positif
    }
    return false;  // Retourne false si le port n'est pas valide
  };
  
  // Configuration du port
  // Utilise le port défini dans les variables d'environnement ou 3000 par défaut
  const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    
    // Gestion des différents types d'erreurs
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');  // Erreur de permissions
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');  // Port déjà utilisé
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  const http = require("http")
  const server = http.createServer(app)

  server.on("error", errorHandler)
  server.on("listening", () => {
    const address = server.address()
    const bind = typeof address === "string" ? "pipe " + address : "port " + port
    console.log("Listening on " + bind)
  })

server.listen(port)