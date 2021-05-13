
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
}

export default async function fetchGists ({
    after,
    before,
    take = 8,
}: IGraphqlPageQuery) {
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
                        files: Array<{
                            name: string,
                            text: string,
                        }>,
                    },
                }>,
                pageInfo: IGraphqlPageInfo,
            },
        },
    }>(
        `query secretGists($first: Int, $last: Int, $after: String, $before: String) {
            viewer {
                gists (first: $first, last: $last, after: $after, before: $before, privacy: SECRET, orderBy: {field: CREATED_AT, direction: ASC} ) {
                    edges {
                        node {
                            name
                            createdAt
                            updatedAt
                            description
                            stargazerCount
                            files {
                                name
                                text
                            }
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
            [before ? 'last' : 'first']: take,
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
