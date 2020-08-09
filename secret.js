const core = require("@actions/core");

const name = core.getInput("name");
const value = core.getInput("value");
const repository = core.getInput("repository");
const owner = core.getInput("owner");
const push_to_org = core.getInput("push_to_org");
const token = core.getInput("token");

const sodium = require('tweetsodium')
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ auth: token })

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
  let push_to_org = process.env.PUSH_TO_ORG;

  let url = 'PUT '

  if(push_to_org) {
    let owner = process.env.OWNER;
    url += '/org/' + owner;
  }
  else {
    let repo = process.env.REPO;
    url += '/repos/' + repo;
  }

  url += '/actions/secrets/{name}'

  return octokit.request(url, {
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
