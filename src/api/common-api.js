import api from './api';

export async function getInTheaters(start, count) {
    return await api.getInTheaters(start, count).then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.error(err);
    })
}

export async function getComingSoon(start, count) {
    return await api.getComingSoon(start, count).then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.error(err);
    })
}

export async function getTop250(start, count) {
    return await api.getTop250(start, count).then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.error(err);
    })
}

export async function getNewMovie() {
    return await api.getNewMovie().then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.log(err);
    })
}

export async function getWeeklyMovie() {
    return await api.getWeeklyMovie().then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.log(err);
    })
}

export async function getUsBox() {
    return await api.getUsBox().then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.log(err);
    })
}

export async function getMovieDetails(id) {
    return await api.getMovieDetails(id).then((res) => {
        if (res) {
            return res;
        }
    }).catch((err) => {
        console.log(err);
    })
}

