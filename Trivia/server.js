// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
fastify.register(require('@fastify/cors'), {});

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
/* fastify.get('/registro', async (request, reply) => { */
  // request.query - datos desde GET
/*   const datos = request.body;
  return {datos};
}) */
fastify.post('/registro', require('./src/registro.js'));
fastify.post('/login', require('./src/login.js'));
fastify.get('/usuario/checktoken', require('./src/checktoken.js'));

fastify.route({
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  url: '/categoria',
  handler: require('./src/categoria')
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()