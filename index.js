const core = require('@actions/core')
const Api = require('./src/api')

/**
 * Set secrets in Github repo
 *
 * @see https://developer.github.com/v3/actions/secrets/#create-or-update-an-organization-secret
 */
const boostrap = async (api, secret_name, secret_value) => {

  try {
    const {key_id, key} = await api.getPublicKey()

    const data = await api.createSecret(key_id, key, secret_name, secret_value)

    const response = await api.setSecret(data, secret_name)

    console.error(response.status, response.data)

    if (response.status > 400) {
      core.setFailed(response.data)
    } else {
      core.setOutput('status', response.status);
      core.setOutput('data', response.data);
    }

  }catch (e) {
    core.setFailed(e.message)
    console.error(e)
  }
}


try {
  // `who-to-greet` input defined in action metadata file
  const name = core.getInput('name')
  const value = core.getInput('value')
  const repository = core.getInput('repository')
  const token = core.getInput('token')
  const org = core.getInput('org')

  const api = new Api(token, repository, org)

  boostrap(api, name, value)

} catch (error) {
  core.setFailed(error.message)
}