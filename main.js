const userSocialLinks = {
    github: "Marcos-Fernando",
}

function getGitHubProfileInfos(){
    const url = `https://api.github.com/users/${userSocialLinks.github}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        userName.textContent = data.name,
        userCompany.textContent = data.company,
        userComp.textContent = data.company,
        userLinkGit.href = data.html_url,
        userLocation.textContent = data.location,
        userTwitter.textContent = data.twitter_username,
        userPhoto.src = data.avatar_url,
        userBio.textContent = data.bio
        //accountPhoto.src = data.avatar_url
    })
}


function getGitHubRepos(){
    fetch(`https://api.github.com/users/${userSocialLinks.github}/repos`)
    .then(async response =>{
        if(!response.ok){
            throw new Error(response.status)
        }

        let element = document.querySelector('.container-recent-project')
        element.innerHTML = ""

        var select = document.getElementById('select')
        var value = select.options[select.selectedIndex].value
        var data = await response.json()

        data.map(item =>{
            let li = document.createElement('li')

               if(item.language == value){
                
                var color = item.language == "HTML" ? '#e34c26' 
                : item.language == "CSS" ? '#563d7c' 
                : item.language == "TypeScript" ? '#2b7489'
                : '#f1e05a'
                
                    li.innerHTML = `
                            <li class="box card-project">
                                <a href="https://github.com/Marcos-Fernando/${item.name}" target="_blank"> 
                                    <div class="title-project">

                                        <img src="images/folder.svg" atl=""/>
                                        <span>${item.name}</span>
                                        
                                    </div>
                                    <div class="description-project">
                                        <p>
                                            ${item.description}
                                        </p>
                                    </div>
                                    <div class="details-project">
                                        <div class="icons-project">
                                            <img src="images/star.svg" alt="" />
                                            <span class="proj-counter">${item.stargazers_count}</span>
                                            <img src="images/git-branch.svg" alt="" />
                                            <span class="proj-counter">${item.forks_count}</span>
                                        </div>

                                        <div class="icons-project">
                                            <p class="globe" style="background-color: ${color}"></p>
                                            <span class="proj-tech">${item.language}</span>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        `

                element.appendChild(li)
                
            }
        })

    }).catch(e => console.log(e))
}


getGitHubProfileInfos()
getGitHubRepos()
