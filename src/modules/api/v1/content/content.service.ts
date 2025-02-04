import * as Content from "../../../../repositories/content";

interface QueryPagination {
    page: number;
    limit: number;
}

export const getContents = async (query: QueryPagination) => {
    const { page, limit } = query;
    const offset = (page - 1) * limit;

    const contents = await Content.getAll(offset, limit);

    const totalContent = await Content.count();
    const totalPages = Math.ceil(totalContent / limit);

    return {
        contents,
        pagination: {
            page,
            limit,
            totalData: totalContent,
            totalPages: totalPages,
            links: {
                next: page < totalPages ? `/api/v1/content?page=${page + 1}&limit=${limit}` : null,
                prev: page > 1 ? `/api/v1/content?page=${page - 1}&limit=${limit}` : null,
            },
        },
    };
};