# Set Secret Action

Create or edit actions secrets in repository or organizations

![Test Workflow](https://github.com/hmanzur/actions-set-secret/workflows/Setup%20Secret/badge.svg)

![Deploy to Market](https://github.com/hmanzur/actions-set-secret/workflows/Deploy%20to%20Market/badge.svg)

## Usage

### Inputs

### name

**Required** `String` Secret name.

### value

**Required** `String` Secret value to store.


### token

**Required** `String` Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)

### repository

**Required** `String` Repository or organization to store. Default `github.repository` [context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context)

### org

`Boolean` Indicates the repo is an [organization](https://docs.github.com/en/github/setting-up-and-managing-organizations-and-teams/about-organizations). Default `false`

### visibility

`String` that configures the access that repositories have to the organization secret.
Options are `all`, `private`, `selected`

### selected_repository_ids

### Outputs

### status

Response status code 

### data

Response json payload

## Examples

### For personal repo

```YAML
uses: hmanzur/actions-set-secret@v2.0.2
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: hmanzur/actions-set-secret
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

### For organizations

```YAML
uses: hmanzur/actions-set-secret@v2.0.1
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: 'my-org'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
  org: true
  visibility: 'all'
```

## References

### References for repository

- [Get a repository public key](https://developer.github.com/v3/actions/secrets/#get-a-repository-public-key)
- [Create or update repository secret](https://developer.github.com/v3/actions/secrets/#create-or-update-a-repository-secret)

### References for organization

- [Get an organization public key](https://developer.github.com/v3/actions/secrets/#get-an-organization-public-key)
- [Create or update an organization secret](https://developer.github.com/v3/actions/secrets/#create-or-update-an-organization-secret)
