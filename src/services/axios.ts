import axios from 'axios';

/**
 * withCredentials: false
 * to avoid preflight request and cors error we need to delete Accept and Content-Type headers from get requests
 *
 * Axios automatically:
 * - Adds more headers by default
 * - Sets Content-Type header
 * - Triggers preflight OPTIONS request
 *
 * Fetch by default:
 * - Makes simpler requests
 * - Doesn't add extra headers
 * - Avoids preflight for simple GET requests
 */
const axiosInstance = axios.create({ withCredentials: false });

export default axiosInstance;
