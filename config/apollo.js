import { useMemo } from 'react';
import ApolloClient, { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-boost';

// Workaround for `heuristic fragment matcher` warning
// https://github.com/apollographql/apollo-client/issues/5423#issue-504700166
const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
        __schema: {
            types: []
        }
    }
});

let apolloClient;

function createApolloClient() {
    return new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_DOTCMS_HOST}/api/v1/graphql`,
        cache: new InMemoryCache({ fragmentMatcher }),
        onError: function(error) {
            console.log(error)
        }
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export const useApollo = (initialState) => useMemo(() => initializeApollo(initialState), [initialState])
