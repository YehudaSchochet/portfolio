

export default async function getJson(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`You screwed up. Heres how: ${response.status} ${response.statusText}`);
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error(error);
    }
}