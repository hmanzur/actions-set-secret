const sodium = require('tweetsodium')
const { Octokit } = require('@octokit/core')

const [repo, secret_name, secret_value, auth, org=false] = process.argv;

const octokit = new Octokit({ auth })

/**
 * Generate public key to store secrets
 *
 * @param {string} repo - Repository in format username/repo-name
 * @param {boolean} org - Is a Organization
 * @returns {Promise<{data:Object}>}
 */
const getPublicKey = async(repo, org=false) => {
  let { data } = await octokit.request('GET /{base}/:repo/actions/secrets/public-key', {
    base: org ? 'orgs': 'repos',
    repo
  })

  return data;
}

/**
 * Create encrypt secret
 *
 * @param {string} key_id - Secret key id
 * @param {string} key - Secret key
 * @param {string} name - Secret name
 * @param {string} value - Secret value
 * @returns {{key_id: string, encrypted_value: string}} - Secret data
 */
const createSecret = async(key_id, key, name, value) => {
  const messageBytes = Buffer.from(value)

  const keyBytes = Buffer.from(key, 'base64')

  const encryptedBytes = sodium.seal(messageBytes, keyBytes)

  return {
    encrypted_value: Buffer.from(encryptedBytes).toString('base64'),
    key_id
  }
}

/**
 * Set secret on repository
 *
 * @param {{encrypted_value:string, key_id:string}} data - Object data to request
 * @param {string} repo - Repository in format username/repo-name
 * @param {string} name - Secret name
 * @param {boolean} org - Is a Organization
 * @returns {Promise} - Fetch Response
 */
const setSecret = (data, repo, name, org) => {
  return octokit.request('PUT /{base}/{repo}/actions/secrets/{name}', {
    base: org ? 'orgs': 'repos',
    repo,
    name,
    data
  })
}

/**
 * Set secrets in Github repo
 *
 * @see https://developer.github.com/v3/actions/secrets/#create-or-update-an-organization-secret
 */
const boostrap = async () => {

  try {
    const {key_id, key} = await getPublicKey(repo)

    const data = await createSecret(key_id, key, secret_name, secret_value)

    const response = await setSecret(data, repo, secret_name, org)

    console.log(response.status, response.data)

  }catch (e) {
    console.error(e)
    exit(1)
  }
}

boostrap()
