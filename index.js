const rootURL="http://api.github.com"

function getRepositories() {
  const username=document.getElementById("username").value
  const uri=rootURL+"/users/"+username+"/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", showRepositories);
  req.open("GET", uri)
  req.send()
  return false;
}

function showRepositories(event, data) {
  //this is set to the XMLHttpRequest object that fired the event
  const repos = JSON.parse(this.responseText)
  //console.log(repos)
  const repoList = "<ul>"+repos.map(r => {
    const userName='userName="'+r.owner.login+'"'
    const repoName='repository="'+r.name+'"'
    return(`
     <li>
         <h2>${r.name}</h2>
          <a href="${r.html_url}">${r.html_url}</a><br>
          <a href="#" ${repoName} ${userName} onclick="getDetails(this)">Get Details</a><br>
          <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a><br></li>
          </li>`)

   }).join('')+"</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getDetails(el) {
  const name = el.dataset.repository
  const uri=rootURL+"/repos/"+el.dataset.username+"/"+name+"/commits"
  const req = new XMLHttpRequest()
  req.addEventListener("load", showDetails)
  req.open("GET", uri)
  req.send()
}

function showDetails() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
