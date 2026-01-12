export const tFetch = (url, opts) => {
    return fetch(url, opts).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        // HEAD Method doesn't return anything in the body, so response.json() fails, since it's only a method to check
        // if the resource is available it's okay to return never
        if (opts?.method === "HEAD")
            return Promise.resolve();
        return response.json();
    });
};
