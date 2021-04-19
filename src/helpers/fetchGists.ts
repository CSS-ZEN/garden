
import {graphql} from '@octokit/graphql'

import {FETCH_GISTS_CACHE_LIFETIME} from 'src/config'
import cached from './cached'


export interface IGraphqlPageInfo {
    endCursor: string | null,
    hasNextPage: boolean,
}

export default async function fetchGists (fromCursor?: string) {
    return cached(`fetch:viewer:gists:${fromCursor}`, async () => {
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
            `query secretGists($take: Int = 10, $after: String) {
            viewer {
                gists (first: $take, after: $after, privacy: SECRET, orderBy: {field: CREATED_AT, direction: DESC} ) {
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
                    }
                }
            }
        }`,
            {
                after: fromCursor || undefined,
                headers: {
                    authorization: `token ${process.env.GIST_TOKEN}`
                }
            }
        )

        const gists = viewer.gists.edges.map(edge => edge.node)
        const {pageInfo} = viewer.gists

        return {
            ok: true,
            gists,
            pageInfo
        }
    }, FETCH_GISTS_CACHE_LIFETIME)
}
