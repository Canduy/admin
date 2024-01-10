class Storage {
	getAccessToken() {
		return sessionStorage.getItem('accessToken');
	}

	getRefreshToken() {
		return sessionStorage.getItem('refreshToken');
	}

	setAccessToken(value) {
		return sessionStorage.setItem('accessToken', value);
	}

	setRefreshToken(value) {
		return sessionStorage.setItem('refreshToken', value);
	}

	removeAccessToken() {
		return sessionStorage.removeItem('accessToken');
	}

	removeRefreshToken() {
		return sessionStorage.removeItem('refreshToken');
	}
}

export default new Storage();

