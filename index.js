const Core = require('@actions/Core')
const Api = require('./src/api')

/**
 * Set secrets in Github repo
 *
 * @param {Api} api - Api instance
 * @param {string} secret_name - Secret key name
 * @param {string} secret_value - Secret raw value
 * @see https://developer.github.com/v3/actions/secrets/#create-or-update-an-organization-secret
 */
const boostrap = async (api, secret_name, secret_value) => {

  try {
    const {key_id, key} = await api.getPublicKey()

    const data = await api.createSecret(key_id, key, secret_name, secret_value)

    if (api.isOrg()) {
      data.visibility = Core.getInput('visibility')

      if (data.visibility === 'selected') {
        data.selected_repository_ids = Core.getInput('selected_repository_ids')
      }
    }

    const response = await api.setSecret(data, secret_name)

    console.error(response.status, response.data)

    if (response.status >= 400) {
      Core.setFailed(response.data)
    } else {
      Core.setOutput('status', response.status)
      Core.setOutput('data', response.data)
    }

  } catch (e) {
    Core.setFailed(e.message)
    console.error(e)
  }
}


try {
  // `who-to-greet` input defined in action metadata file
  const name = Core.getInput('name')
  const value = Core.getInput('value')
  const repository = Core.getInput('repository')
  const token = Core.getInput('token')
  const org = Core.getInput('org')

  const api = new Api(token, repository, !!org)

  boostrap(api, name, value)

} catch (error) {
  Core.setFailed(error.message)
}
