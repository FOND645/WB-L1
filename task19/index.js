const API_KEY = '8ebfb0148ebfb0148ebfb014528da9c85988ebf8ebfb014ebd896c1e3e63f447c79f5da'
const COMMUINTY_DOMAIN = 'escapefromtarkov'

class VKExtension {
    constructor(apiKey, communityDomain) {
        this.apiKey = apiKey
        this.communityDomain = communityDomain
        this.pullRemoteData(0,100)
        this.postsContainerElement = document.getElementById('widget')
    }

    getLocalStoragePostsIDs() {
        let result = []
        for (let postID in localStorage) {
            if (postID.includes('postID:')) result.push(postID.replace('postID:', ""))
        }
        return result
    }

    getLocalPost(ID) {
        if (!localStorage.hasOwnProperty(`postID:${ID}`)) return JSON.stringify(false)
        return JSON.parse(localStorage[`postID:${ID}`])
    }

    writeLocalPost(Post) {
        const ID = Post.id
        localStorage.setItem(`postID:${ID}`, JSON.stringify(Post))
    }

    pullRemoteData(offset, count) {
        return new Promise((res, rej) => {
            fetch(this.getFetchURL(offset, count))
                .then(response => response.json())
                .then(data => this.filterResponse(data))
                .then(data => this.updateLocalStorage(data))
        })
    }

    getFetchURL(offset, count) {
        return `/vkapi/method/wall.get/?access_token=${this.apiKey}&offset=${offset}&count=${count}&domain=${this.communityDomain}&v=5.199`
    }

    filterResponse(data) {
        console.log(data)
        let filtredData = {
            posts: data.response.items.map(Post => {
                const ImgUrl = (() => {
                    if (Post.attachments.length === 0) return null
                    if (Post.attachments[0].type === "photo") {
                        return Post.attachments[0].photo.sizes.find(Photo => Photo.type === "m").url
                    } else if (Post.attachments[0].type === "video") {
                        return Post.attachments[0].video.image[0].url
                    }
                })()
                return {
                    id: Post.id,
                    hash: Post.hash,
                    type: Post.type,
                    date: Post.date,
                    text: Post.text,
                    imgaeURL: ImgUrl
                }
            }).sort((A, B) => B.date - A.date)
        }
        return filtredData
    }

    getPostHTML(Post) {
        const {date, text, imgaeURL} = Post
        const postDate = new Date(date)
        console.log(Post)
        return `<div class="post-container">
            <p class="post-text">${text}</p>
            ${imgaeURL ? `<img src="${imgaeURL}" class="post-image">` : ''}
            <p class="post-date">${postDate.toLocaleDateString()}</p>
        </div>`
    }

    drawPosts() {
        const postsIDs = this.getLocalStoragePostsIDs()
        console.log(postsIDs)
        this.postsContainerElement.innerHTML = postsIDs
        .map(ID => this.getLocalPost(ID))
        .sort((A, B) => B.date - A.date)
        .map(Post => this.getPostHTML(Post))
        .join("")
    }

    updateLocalStorage(data) {
        data.posts.forEach(Post => {
            this.writeLocalPost(Post)
        })
        this.drawPosts()
    }

    updateInterval = setInterval((() => {this.pullRemoteData(0, 100)}).bind(this), 15000)
}

const APP = new VKExtension(API_KEY, COMMUINTY_DOMAIN)

console.log(APP)