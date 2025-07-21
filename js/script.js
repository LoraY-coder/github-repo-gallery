//div where the profile information will appear
const overview = document.querySelector(".overview");
//Unordered list to display the repos list
const repoList = document.querySelector(".repo-list");

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
};

const fromGitRepos = async function () {
    const gitRepoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated,per_page=100`);
    const dataRepo = await gitRepoInfo.json();
    displayRepoInfo(dataRepo);
};
fromGitRepos();

const displayRepoInfo = function (repos) {
    for (let item of repos) {
        let listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${item.name}</h3>`;
        repoList.append(listItem);
    }
};