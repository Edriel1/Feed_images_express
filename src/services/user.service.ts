import Prisma_Service from '../../prisma.service';

import {Prisma} from '@prisma/client';

const prisma = new Prisma_Service()
export default class User {
    constructor() {};
    
    public async create(data: Prisma.userCreateInput) {return prisma.user.create({data});};

    public async update(where: Prisma.userWhereUniqueInput, data: Prisma.userUpdateInput) {return await prisma.user.update({where, data})};

    public async findUserByID(where: Prisma.userWhereUniqueInput) {return await prisma.user.findUnique({where})};

    public async delete(where: Prisma.userWhereUniqueInput) {return await prisma.user.delete({where})};
}