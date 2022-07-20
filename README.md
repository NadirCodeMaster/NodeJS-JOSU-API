## JOSU.AI API

This repository hosts API for Josu applicaton.

Node 14.4.0 | Cassandra 3.11.6

#### Documentation

See http://docs.josu.ai or [raw OpenAPI docs](./openapi.yml). Please don't edit it manually - it is generated from docstrings.

#### Development

Don't forget to ask your peers for `.env.local`. Please make sure your editor respects `.editorconfig`.

- `npm install` for dependencies
- `npm start` for dev server
- `npm test` for testing
- `npm run lint` for linting
- `npm run flush-local <keyspace>` for Cassandra setup (CAUTION: would wipe out existing data!)
- `npm run flush-deployment <keyspace>` for Keyspaces setup (**CAUTION**: would wipe out existing **PRODUCTION** data!)
- `ln -sr .hooks/pre-commit .git/hooks/` for pre-commit hook (automatic test & lint)

AWS Keyspaces connection string: `cqlsh cassandra.us-west-2.amazonaws.com 9142 --keyspace josu --username <username> --password <password> --ssl`

Cassandra connection string: `cqlsh --keyspace josu`

#### Deployment

For every commit on develop branch via Github Actions. See `.github/workflows/ci.yml` for details.

Check deployment status via https://github.com/arricor/josu.api/actions.

Secrets live in https://github.com/arricor/josu.api/settings/secrets. Don't forget to bind secrets to envars in `env` section of Action task.

#### Guidelines

API tries to follow [JSON:API](https://jsonapi.org/). There are few conventions:

- JSON key names should be **snake_case** because it simplifies Cassandra queries and plays well with Python microservices (that is a deviation from JSON:API)
- CQS is achieved by responding 200 for queries and **202** for commands as 204 prohibits payload and hence HATEOAS Level 3 (resource links)
- prefer named parameters (`:id`) over positional ones (`?`) in Cassandra queries as latter does not support prepared statements and complicate function signatures
- store nested arrays as **set** / **list** and nested objects as json-encoded **text** as it minimizes data transformation and prepares us for life with standalone Cassandra
- prepend Josu-specific Cassandra fields with double underscores (`__is_cancelled`) in order to distinguish them from G / MS native fields (`is_organizer`)
- endpoints with **Bearer** authentication are intended for UI consumers while **Basic** ones are for internal data processing services only
- custom errors classes (`Error400`) denote expected (UI issue) failures while `new Error()` (500) denote unexpected (API issue) failures
- include table name in identifier (`user_id` instead of id) unless identifier replicates foreign entity (e.g. `id` in Meeting named after G / MS ones)
- `info` logging records request-level details while `debug` is used for individual messages
