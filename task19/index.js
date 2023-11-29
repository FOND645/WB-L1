const API_KEY =
    '8ebfb0148ebfb0148ebfb014528da9c85988ebf8ebfb014ebd896c1e3e63f447c79f5da';
const COMMUINTY_DOMAIN = 'escapefromtarkov';

class VKExtension {
    constructor(apiKey, communityDomain) {
        this.apiKey = apiKey;
        this.communityDomain = communityDomain;
        this.postsContainerElement = document.getElementById('widget');
        this.drawPosts();
    }

    getLocalStoragePostsIDs() {
        let result = [];
        for (let postID in localStorage) {
            if (postID.includes('postID:'))
                result.push(postID.replace('postID:', ''));
        }
        return result;
    }

    getLocalPost(ID) {
        if (!localStorage.hasOwnProperty(`postID:${ID}`))
            return JSON.stringify(false);
        return JSON.parse(localStorage[`postID:${ID}`]);
    }

    writeLocalPost(Post) {
        const ID = Post.id;
        localStorage.setItem(`postID:${ID}`, JSON.stringify(Post));
    }

    pullRemoteData(offset, count) {
        return new Promise((res, rej) => {
            fetch(this.getFetchURL(offset, count))
                .then((response) => response.json())
                .then((data) => this.filterResponse(data))
                .then((data) => this.updateLocalStorage(data));
        });
    }

    getFetchURL(offset, count) {
        return `/vkapi/method/wall.get/?access_token=${this.apiKey}&offset=${offset}&count=${count}&domain=${this.communityDomain}&v=5.199`;
    }

    parseLinks(text) {
        const regexAll = /https?:\/\/\S+/gi;
        const matches = text.match(regexAll);
        if (!matches) return text;
        matches.forEach((Mtch) => {
            text = text.replace(
                Mtch,
                `<a href="${Mtch}" class="post-link">${Mtch}</a>`
            );
        });
        return text;
    }

    filterResponse(data) {
        let filtredData = {
            posts: data.response.items
                .map((Post) => {
                    const ImgUrl = (() => {
                        if (Post.attachments.length === 0) return null;
                        if (Post.attachments[0].type === 'photo') {
                            return Post.attachments[0].photo.sizes.find(
                                (Photo) => Photo.type === 'q'
                            ).url;
                        } else if (Post.attachments[0].type === 'video') {
                            return Post.attachments[0].video.image[3].url;
                        }
                    })();
                    return {
                        id: Post.id,
                        hash: Post.hash,
                        type: Post.type,
                        date: Post.date,
                        text: this.parseLinks(Post.text),
                        imgaeURL: ImgUrl,
                    };
                })
                .filter((A) => A.text || A.imgaeURL)
                .sort((A, B) => B.date - A.date),
        };
        return filtredData;
    }

    getPostHTML(Post) {
        const { date, text, imgaeURL } = Post;
        const postDate = new Date(date * 1000);
        return `<div class="post-container">
            <p class="post-text">${text}</p>
            ${imgaeURL ? `<img src="${imgaeURL}" class="post-image">` : ''}
            <p class="post-date">${postDate.toLocaleDateString()}</p>
        </div>`;
    }

    drawPosts() {
        const postsIDs = this.getLocalStoragePostsIDs();
        this.postsContainerElement.innerHTML = postsIDs
            .map((ID) => this.getLocalPost(ID))
            .sort((A, B) => B.date - A.date)
            .map((Post) => this.getPostHTML(Post))
            .join('');
    }

    updateLocalStorage(data) {
        data.posts.forEach((Post) => {
            this.writeLocalPost(Post);
        });
        this.drawPosts();
    }

    updateInterval = setInterval(
        (() => {
            this.pullRemoteData(0, 100);
        }).bind(this),
        15000
    );
}

const APP = new VKExtension(API_KEY, COMMUINTY_DOMAIN);
