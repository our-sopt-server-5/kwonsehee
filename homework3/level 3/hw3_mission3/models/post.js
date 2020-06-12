let postData = [
    {
        idx:0,
        author: 'sehee',
        title: '안녕하세요 !',
        content: '첫번째 데이터',
        created_at: '2020-06-09'
    },
    {
        idx:1,
        author: 'sehee1',
        title: '안녕하세요 !',
        content: '두번째 데이터',
        created_at: '2020-06-10'
    },
    {
        idx:2,
        author: 'sehee2',
        title: '안녕하세요 !',
        content: '세번째 데이터',
        created_at: '2020-06-11'
    },
];

const post = {
    readAll : async() => {
        return postData;
    },
    read : async(idx) =>{
        const data = postData.filter(post => post.idx == idx);
        return data;
    },
    create: async(author, title, content, created_at) => {
        const idx = postData[postData.length - 1].idx + 1;
        const createPost = {
            idx,
            author,
            title,
            content,
            created_at
        }
        postData.push(createPost);
        return idx;
    },
    delete: async(idx)=>{
        postData.splice(idx);
        return true;
    },
    update : async(idx, updatePost) =>{
        for(i in updatePost){
            if(updatePost[i] !== undefined){
                postData[idx][`${i}`] = updatePost[i];
            }
        }
        return postData[idx];
    }
}
module.exports = post;