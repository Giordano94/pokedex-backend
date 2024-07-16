import 'dotenv/config';

const port = process.env.PORT || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const pokeApiUrl = process.env.POKE_API || '';

export {
    port,
    hostname,
    pokeApiUrl
};