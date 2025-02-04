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

export const getBunnyContents = async () => {
    const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
    const BUNNY_LIBRARY_ID = process.env.BUNNY_LIBRARY_ID;
    
    if (!BUNNY_API_KEY) {
        throw new Error("BUNNY_API_KEY is not defined");
    }

    const url = `https://video.bunnycdn.com/library/${BUNNY_LIBRARY_ID}/videos`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            AccessKey: BUNNY_API_KEY
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch Bunny contents");
    }
};

export const storeContent = async (data: Content.Content) => {
    console.log(data);
};