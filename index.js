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
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = "<ul>"+${repos.map(r =>{
    const username='username"'+r.owner.login+'"'
    const repoName='repository"'+r.name+'"'
    return(
     `<li>
         <h2>${r.name}</h2>
          <a href="${r.html_url}">${r.html_url}</a><br>
          <a href="#"${repoName}${userName} onclick="getDetails(this)">Get Details</a><br>
          <a href="#"${repoName}${userName} onclick="getBranches(this)">Get Branches</a><br>
          </li>`

   }).join('')+""</ul>""
  document.getElementById("repositories").innerHTML = repoList
}

function getDetails(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showDetails)
  req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.send()
}

function showDetails() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
