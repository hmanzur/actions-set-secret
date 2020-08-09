# Set Secret Action
Use to create or update a secret on Repository or Organization

## Inputs
### name
**Required** Secret name.

### value
**Required** Secret value to store.

### repository
Repository to store. 

Default is `false`.

If is `false` reposiroty will be retreived from [context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#github-context).

### owner
  description: Owner of repository
  default: false
  required: false

### push_to_org
  description: Flag to use organization endpoint for secret
  default: false
  required: false

### token:
**Required** Repository [Access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token)


## Usage
### Custom repository
```YAML
uses: hmanzur/actions-set-secret@v1.0.0
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  owner: hmanzur
  repository: actions-set-secret
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```
### Same repository from action
```YAML
uses: hmanzur/actions-set-secret@v1.0.0
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```

### Custom organization
```YAML
uses: hmanzur/actions-set-secret@v1.0.0
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  owner: imobanco
  push_to_org: true
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```
### Same organization from action
```YAML
uses: hmanzur/actions-set-secret@v1.0.0
with:
  name: 'MY_SECRET_NAME'
  value: 'Lorem ipsun dolor simit'
  push_to_org: true
  token: ${{ secrets.REPO_ACCESS_TOKEN }}
```