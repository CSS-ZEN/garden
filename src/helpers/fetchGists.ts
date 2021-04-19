
import {graphql} from '@octokit/graphql'


export default async function fetchGists (fromCursor?: string) {
    const {viewer} = await graphql<{
        viewer: {
            gists: {
                edges: Array<{
                    node: {
                        id: string,
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
                pageInfo: {
                    endCursor: string,
                    hasNextPage: boolean,
                },
            },
        },
    }>(
        `query secretGists($take: Int = 10, $after: String) {
            viewer {
                gists (first: $take, after: $after, privacy: SECRET, orderBy: {field: CREATED_AT, direction: DESC} ) {
                    edges {
                        node {
                            id
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
                    }
                }
            }
        }
        `,
        {
            after: fromCursor,
            headers: {
                authorization: `token ${process.env.GIST_TOKEN}`
            }
        }
    )

    const gists = viewer.gists.edges.map(edge => edge.node)
    const {pageInfo} = viewer.gists

    return {
        gists,
        pageInfo
    }
}
