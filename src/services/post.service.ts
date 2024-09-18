import {Prisma} from '@prisma/client';
import {services} from '../../service';
import prisma_service from '../../prisma.service';

const prisma = new prisma_service();

@services
export default class Post {    
    constructor() {};
    
    public async create(data: Prisma.postCreateInput) {return prisma.post.create({data});};

    //public async update(where: Prisma.postWhereUniqueInput, data: Prisma.postUpdateInput) {return await prisma.post.update({where, data})};

    public async findPostByID(where: Prisma.postWhereUniqueInput) {return await prisma.post.findUnique({where, select: {title: true, author: true, content: true, published: true, images: true}})};

    public async feedPost(skip: number = 0) {return await prisma.post.findMany({select: {content: true, title: true, images: true, author: true}, take: 10, skip, orderBy:{published: 'desc'}})};

    public async delete(where: Prisma.postWhereUniqueInput) {return await prisma.post.delete({where})};
}; 
