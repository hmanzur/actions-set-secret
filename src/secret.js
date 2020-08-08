const sodium = require('tweetsodium')
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ auth: process.env.REPO_ACCESS_TOKEN })

const getPublicKey = async(repo) => {
  let { data } = await octokit.request('GET /repos/:repo/actions/secrets/public-key', { repo })

  return data;
}

const createSecret = async(key_id, key, secret) => {
  const messageBytes = Buffer.from(secret)

  const keyBytes = Buffer.from(key, 'base64')

  const encryptedBytes = sodium.seal(messageBytes, keyBytes)

  return {
    encrypted_value: Buffer.from(encryptedBytes).toString('base64'),
    key_id
  }
}

const setSecret = (data) => {
  return octokit.request('PUT /repos/{repo}/actions/secrets/{name}', {
    repo: process.env.REPO,
    name: process.env.SECRET_NAME,
    data
  })
}

const boostrap = async () => {
  try {
    const {key_id, key} = await getPublicKey(process.env.REPO)

    const data = await createSecret(key_id, key, process.env.SECRET_VALUE)

    const response = await setSecret(data)

    console.log(response.status, response.data)

  }catch (e) {
    console.error(e)
  }
}



boostrap()
