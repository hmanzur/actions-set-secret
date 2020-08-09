const github = require("@actions/github");
const core = require("@actions/core");

const name = core.getInput("name");
const value = core.getInput("value");
const token = core.getInput("token");

const sodium = require('tweetsodium')
const { Octokit } = require('@octokit/core')
const octokit = new Octokit({ auth: token })

const context = github.context;
const repoName = context.payload.repository.name;
const ownerName = context.payload.repository.owner.login;

let repository = core.getInput("repository");
if(repository == 'false'){
  repository = repoName;
}

let owner = core.getInput("owner");
if(owner == 'false'){
  owner = ownerName;
}

let push_to_org = core.getInput("push_to_org");
if(push_to_org == 'false'){
  push_to_org = false;
}
else{
  push_to_org = true;
}


function get_() {
  if(push_to_org) {
    return '/org/' + owner;
  }
  else {
    return '/repos/' + repository;
  }
}

const getPublicKey = async() => {

  let url = "GET "
  url += get_()
  url += "/actions/secrets/public-key"

  let { data } = await octokit.request(url)

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

  let url = 'PUT '

  url += get_()

  url += '/actions/secrets/' + name

  return octokit.request(url, {
    data
  })
}

const boostrap = async () => {
  try {
    const {key_id, key} = await getPublicKey()

    const data = await createSecret(key_id, key, value)

    const response = await setSecret(data)

    console.log(response.status, response.data)

  }catch (e) {
    console.error(e)
  }
}



boostrap()
  .then(
    result => {
      // eslint-disable-next-line no-console
      console.log(result);
    },
    err => {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  )
  .then(() => {
    process.exit();
  });
