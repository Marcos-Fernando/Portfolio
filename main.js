// const userSocialLinks = {
//     github: "Marcos-Fernando",
// }

// function getGitHubProfileInfos(){
//     const url = `https://api.github.com/users/${userSocialLinks.github}`

//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         userName.textContent = data.name,
//         userCompany.textContent = data.company,
//         userComp.textContent = data.company,
//         userLinkGit.href = data.html_url,
//         userLocation.textContent = data.location,
//         userTwitter.textContent = data.twitter_username,
//         userPhoto.src = data.avatar_url,
//         userBio.textContent = data.bio
//         //accountPhoto.src = data.avatar_url
//     })
// }


// function getGitHubRepos(){
//     fetch(`https://api.github.com/users/${userSocialLinks.github}/repos`)
//     .then(async response =>{
//         if(!response.ok){
//             throw new Error(response.status)
//         }

//         let element = document.querySelector('.container-recent-project')
//         element.innerHTML = ""

//         var select = document.getElementById('select')
//         var value = select.options[select.selectedIndex].value
//         var data = await response.json()

//         data.map(item =>{
//             let li = document.createElement('li')

//                if(item.language == value){
                
//                 var color = item.language == "HTML" ? '#e34c26' 
//                 : item.language == "CSS" ? '#563d7c' 
//                 : item.language == "TypeScript" ? '#2b7489'
//                 : '#f1e05a'
                
//                     li.innerHTML = `
//                             <li class="box card-project">
//                                 <a href="https://github.com/Marcos-Fernando/${item.name}" target="_blank"> 
//                                     <div class="title-project">

//                                         <img src="images/folder.svg" atl=""/>
//                                         <span>${item.name}</span>
                                        
//                                     </div>
//                                     <div class="description-project">
//                                         <p>
//                                             ${item.description}
//                                         </p>
//                                     </div>
//                                     <div class="details-project">
//                                         <div class="icons-project">
//                                             <img src="images/star.svg" alt="" />
//                                             <span class="proj-counter">${item.stargazers_count}</span>
//                                             <img src="images/git-branch.svg" alt="" />
//                                             <span class="proj-counter">${item.forks_count}</span>
//                                         </div>

//                                         <div class="icons-project">
//                                             <p class="globe" style="background-color: ${color}"></p>
//                                             <span class="proj-tech">${item.language}</span>
//                                         </div>
//                                     </div>
//                                 </a>
//                             </li>
//                         `

//                 element.appendChild(li)
                
//             }
//         })

//     }).catch(e => console.log(e))
// }


// getGitHubProfileInfos()
// getGitHubRepos()

// ── CURSOR GLOW
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ── DNA CANVAS BACKGROUND
const canvas = document.getElementById('dna-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00e5a0';
  ctx.strokeStyle = 'rgba(0,229,160,0.3)';
  ctx.lineWidth = 0.5;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.globalAlpha = 1 - dist / 120;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── INTERSECTION OBSERVER (REVEAL + SKILL BARS + TIMELINE)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.dataset.width;
        bar.style.width = (parseFloat(w) * 100) + '%';
        bar.classList.add('animate');
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

// also observe skill groups for bars
document.querySelectorAll('.skill-group').forEach(el => observer.observe(el));