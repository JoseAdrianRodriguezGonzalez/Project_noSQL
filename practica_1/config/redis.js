import {createClient} from 'redis';
export const redisA = createClient({ url: `redis://${process.env.REDIS_MASTER_A_HOST}:6379` });
export const redisB = createClient({ url: `redis://${process.env.REDIS_MASTER_B_HOST}:6379` });
export const redisA1 = createClient({ url: `redis://redis-slave-a1:6379` });
export const redisA2 = createClient({ url: `redis://redis-slave-a2:6379` });
export const redisB1 = createClient({ url: `redis://redis-slave-b1:6379` });
export const redisB2 = createClient({ url: `redis://redis-slave-b2:6379` });
const clients = [
  { client: redisA, name: 'redisA' },
  { client: redisA1, name: 'redisA1' },
  { client: redisA2, name: 'redisA2' },
  { client: redisB, name: 'redisB' },
  { client: redisB1, name: 'redisB1' },
  { client: redisB2, name: 'redisB2' }
];

clients.forEach(({ client, name }) => {
  client.on("error", (err) => console.error(`Error al conectarme a ${name}`, err));
  client.on("connect", () => console.log(` Conectado a ${name}`));
});

// Función para conectar ambos
export const connectRedis = async () => {
  await Promise.all([redisA.connect(),redisA1.connect(),redisA2.connect(),redisB.connect(),redisB1.connect(),redisB2.connect()])
};