import axios from '@/api/axios'

const getArticle = slug => {
    // .then для того чтобы получить из ответа только объект article
    return axios.get(`/articles/${slug}`).then(response => response.data.article)
}

const deleteArticle = slug => {
    return axios.delete(`/articles/${slug}`)
}

const createArticle = articleInput => {
    // передаем в объект article (из api) наш массив
    return axios.post('/articles', {article: articleInput})
        .then(response => response.data.article) // then для редиректа обратно на пост
}

const updateArticle = (slug, articleInput) => {
    return axios
        .put(`/articles/${slug}`, {article: articleInput})
        .then(response => response.data.article) // then для редиректа обратно на пост
}

export default {
    getArticle,
    deleteArticle,
    createArticle,
    updateArticle
}