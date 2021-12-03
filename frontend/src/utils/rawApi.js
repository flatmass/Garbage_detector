import ky from 'ky';
import historyRef from './history';


const host = process.env.REACT_APP_URL || 'http://51.250.18.129/api';

const rawApi = (url, {headers, ...options} = {}) => {
	return ky(
		`${host}${url}`,
		{
			timeout: 2 * 60 * 1000,
			headers: {
				...headers
			},
			credentials: 'include',
			hooks: {
				afterResponse: [
					(request, options, response) => {
						if (response.status === 401) {
							//historyRef.history.push('/login');
						}
					}
				]
			},
			...options
		}
	);
};

export default rawApi;
export {host};
