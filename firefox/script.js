var previousSong = "";


async function getSpotifyAccessToken() {
    var clientId = await browser.storage.local.get("WEB_EXT_SPOTIFY_CLIENT_ID");
    clientId = clientId.WEB_EXT_SPOTIFY_CLIENT_ID;

    var clientSecret = await browser.storage.local.get("WEB_EXT_SPOTIFY_CLIENT_SECRET");
    clientSecret = clientSecret.WEB_EXT_SPOTIFY_CLIENT_SECRET;

    var URL = "https://accounts.spotify.com/api/token?grant_type=client_credentials";

    var req = await fetch(URL, {
        headers: {
            "Authorization": `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        method: "POST",
        body: new URLSearchParams({
            "grant_type": "client_credentials"
        })
    })

    var data = await req.json();
    return data.access_token;
}


async function getArtistGenre(artistId) {
    var URL = "https://api.spotify.com/v1/artists/" + artistId;

    var token = await getSpotifyAccessToken();

    if (!token) return;

    var req = await fetch(URL, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
        method: "GET",
    })

    var data = await req.json();
    var genres = data.genres;

    if (!genres) return;

    var divTarget = document.querySelector("div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div");


    genres.forEach(genre => {
        var span = document.createElement("span");
        span.textContent = genre
        span.style.border = "1px solid turquoise";
        span.style.backgroundColor = "#1ED760";
        span.style.marginLeft = "2%";
        span.style.color = "black";
        span.style.padding = "2px";
        span.style.borderRadius = "20px";

        divTarget.appendChild(span);
    })    


}

setInterval(async () => {
    var div = document.querySelector("div[role='contentinfo']");

    if (!div) return;

    var artistID = div.querySelector("div:nth-of-type(2) > div:nth-of-type(3) > div > div > div > div > span > a").getAttribute("href").replace("/artist/", "");
    if (div.getAttribute("aria-label") != previousSong) {
        previousSong = div.getAttribute("aria-label");
        await getArtistGenre(artistID);
    } 

}, 500); // Every 0.5 seconds