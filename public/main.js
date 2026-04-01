document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton")
    const searchInput = document.getElementById("searchInput")
    searchButton.addEventListener("click", async () => {
        const keyword = searchInput.value
        const response = await fetch(`/jobs?keyword=${encodeURIComponent(keyword)}`)
        const data = await response.json()

        const jobsContainer = document.getElementById("jobs")

        jobsContainer.innerHTML = data.map(job => 
            `<div class="jobCard">
                <div>${job.title}</div>
                <div>${job.description}</div>
                <a href="${job.link}" target="_blank">${job.link}</a>
                <div>${job.source}</div>
            </div>`
        ).join("")

        console.log(data)
    })
})
