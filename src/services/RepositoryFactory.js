import AuthRepository from "./AuthRepository";
import PopulationRepository from "./PopulationRepository";

const repositories = {
    population: PopulationRepository,
    auth: AuthRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};