
import {graphql} from '@octokit/graphql'

export interface IGraphqlPageInfo {
    endCursor: string | null
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string | null
}

export interface IGraphqlPageQuery {
    take?: number
    after?: string
    before?: string
    mode?: 'first' | 'last'
}

export default async function fetchGistsIds ({take = 8, after, before, mode = 'first'}: IGraphqlPageQuery) {
    if (!!after || !!before) {
        mode = !!after ? 'first' : 'last'
    }
    const {viewer} = await graphql<{
        viewer: {
            gists: {
                edges: Array<{
                    node: {
                        name: string,
                        createdAt: string,
                        updatedAt: string,
                        description: string,
                        stargazerCount: number,
                    },
                }>,
                pageInfo: IGraphqlPageInfo,
            },
        },
    }>(
        `query secretGists($take: Int, $after: String, $before: String) {
            viewer {
                gists (${mode}: $take, after: $after, before: $before, privacy: SECRET, orderBy: {field: CREATED_AT, direction: ASC} ) {
                    edges {
                        node {
                            name
                            createdAt
                            updatedAt
                            description
                            stargazerCount
                        }
                    }
                    pageInfo {
                        endCursor
                        hasNextPage
                        hasPreviousPage
                        startCursor
                    }
                }
            }
        }`,
        {
            take,
            after,
            before,
            headers: {
                authorization: `token ${process.env.GIST_TOKEN}`,
            },
        }
    )

    const gists = viewer.gists.edges.map(edge => edge.node)
    const {pageInfo} = viewer.gists

    return {
        ok: true,
        gists,
        pageInfo,
    }
}
