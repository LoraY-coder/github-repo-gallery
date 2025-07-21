//div where the profile information will appear
const overview = document.querySelector(".overview");
//Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//section where all the repo information appears
const reposAllInfo = document.querySelector(".repos");
//section where individual repo information will appear
const repoData = document.querySelector(".repo-data");

const username = "LoraY-coder";

const fromGitUserInfo = async function () {
    const gitUserInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await gitUserInfo.json();
    displayUserInfo(data);
};
fromGitUserInfo();

const displayUserInfo = function (data) {
    const displayInfo = document.createElement("div");
    displayInfo.classList.add("user-info");
    displayInfo.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> 
`;
    overview.append(displayInfo);
    fromGitRepos();
};

const fromGitRepos = async function () {
    const gitRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated,per_page=100`);
    const dataRepo = await gitRepoInfo.json();
    displayRepoInfo(dataRepo);
};


const displayRepoInfo = function (repos) {
    for (let item of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(listItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getSpecificRepo(repoName);
    }

});

const getSpecificRepo = async function (repoName) {
    const fetchSpecificRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specificRepo = await fetchSpecificRepo.json();
    const fetchlanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchlanguages.json();

    //make a list of the languages
    const languages = [];
    for (let each in languageData) {
        languages.push(each);
    };
    displaySpecificRepoInfo(specificRepo, languages)
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    let div = document.createElement("div");
    div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    reposAllInfo.classList.add("hide");
};