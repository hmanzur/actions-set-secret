# Set Secret Action

## Create or edit actions in repository


## Usage

### Inputs

### name

**Required** Secret name.

### value

**Required** Secret value to store.

### repository

**Required** Repository to store. Default is github.repository [context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context)

## Examples

```YAML
uses: hmanzur/actions-set-secret@v1.0.0
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  repository: hmanzur/actions-set-secret
env:
  REPO_ACCESS_TOKEN: ${{ secrets.REPO_ACCESS_TOKEN }}
```
