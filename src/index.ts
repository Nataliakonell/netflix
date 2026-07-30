import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from "./db/prisma";
import axios from 'axios';


const fastify = Fastify({
  logger: true
});

interface CreateProfileBody {
    name: string;
}

// Basic Route
fastify.get('/', async (request, reply) => {
    let result = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=221381933449d5d15f7d0b6a6b1f87a1')
    return result.data;
    
});

fastify.post<{ Body: CreateProfileBody }>(
    '/profiles',
    async (request: FastifyRequest<{ Body: CreateProfileBody }>, reply: FastifyReply) => {
        const { name } = request.body;

        const profile = await prisma.profile.create({
            data: {
                name: name,
            }
        })
        console.log("Created profile:", profile)
        return reply.status(201).send({
            success: true,
            message: `Profile ${profile.name} created com o id ${profile.id}!`,
        });
    }
);

fastify.get('/profiles', 
    async (request: FastifyRequest, reply: FastifyReply) => {
        const allProfiles = await prisma.profile.findMany({});
        return reply.status(200).send({
            success: true,
            data: allProfiles,
        });
    }
);


// Start Server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    await prisma.$disconnect();
    fastify.log.error(err);
    process.exit(1);
  }
};

start();