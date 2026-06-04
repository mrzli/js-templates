# Steps

## TODO

- Setup api stub:
  - Create `src/api/` directory and `parts/` subdirectory under it.
  - Create sub files:
    - `api-config.ts`:
      ```ts
      export interface ApiConfig {
        readonly backendBaseUrl: string;
      }
      ```
    - `parts/example-api.ts`:
      ```ts
      export interface ExampleApi {
        readonly offline: () => Promise<string>;
      }

      export const createExampleApi = (config: ApiConfig): ExampleApi => {
        return {
          offline: async () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(`This is an example response. Backend Base URL: ${config.backendBaseUrl}`);
              }, 1000);
            });
          },
        };
      };
      ```
    - Create index files for `parts`.
    - `app-api.ts`:
      ```ts
      export interface AppApi {
        readonly example: ExampleApi;
      }

      export const createAppApi = (config: ApiConfig): AppApi => {
        return {
          example: createExampleApi(config),
        };
      };
      ```
    - Create index file for `api` that exports everything inside it.
  - Update `app-dependencies.ts` to create the api and add it to the dependencies.
  - Add example usage of `offline` api function in the context example page.
  - Run `bun run format` to format the updated files.
  - Commit the changes with a message like "setup api stub and example usage".
- Expand api stub:
  - Add a new function in example api which uses `fetch` to get some data from a public api:
    - Call it `jsonPlaceholder`.
    - It should accept an `id` parameter, which is a number.
    - It should fetch data from `https://jsonplaceholder.typicode.com/posts/:id`.
    - It should return the response as json. Put type in same file.
  - Expan api example page to include that:
    - Display it in `pre` tag, pretty printed with `JSON.stringify(post, undefined, 2)`.
    - Style it with border, padding, and light gray background, and 'auto' overflow for x axis.
    - Use non-tailwind styling for this, with inline styles.
    - Use suspense etc, just like with `offline` function.
  - Run `bun run format` to format the updated files.
  - Commit the changes with a message like "expand api stub and example usage".

