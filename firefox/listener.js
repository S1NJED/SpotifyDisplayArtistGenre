
window.addEventListener("load", () => {
    function onClickForm() {
    
        var clientID = document.querySelector("#client-id").value;
        var clientSecret = document.querySelector("#client-secret").value;
        
        browser.storage.local.set({ ["WEB_EXT_SPOTIFY_CLIENT_ID"]: clientID });
        browser.storage.local.set({ ["WEB_EXT_SPOTIFY_CLIENT_SECRET"]: clientSecret });

    }

    document.querySelector("#submit-btn").addEventListener("click", onClickForm);

    browser.storage.local.get("WEB_EXT_SPOTIFY_CLIENT_ID").then(res => {
        document.querySelector("#client-id").value = res.WEB_EXT_SPOTIFY_CLIENT_ID;
    })

    browser.storage.local.get("WEB_EXT_SPOTIFY_CLIENT_SECRET").then(res => {
        document.querySelector("#client-secret").value = res.WEB_EXT_SPOTIFY_CLIENT_SECRET;
    })


})