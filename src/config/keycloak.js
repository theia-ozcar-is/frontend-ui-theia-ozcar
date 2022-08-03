const Keycloak = window.Keycloak;


/**
 * Workaround to be able to develop in localhost and
 * use envsubst in production environment
 */
let keycloakUrl;
let clientId;
let baseURL = "${API_URL}";
if (baseURL === "${API" + "_URL}") {
    keycloakUrl = "http://localhost:8082/auth/"
    clientId = "theia-in-situ-front"
} else if (baseURL === "https://test-theia.osug.fr/api-observation") {
    keycloakUrl = "https://sso.aeris-data.fr/auth/"
    clientId = "theia-in-situ-front-dev"
} else if (baseURL === "https://in-situ.theia-land.fr/api-observation") {
    keycloakUrl = "https://sso.aeris-data.fr/auth/"
    clientId = "theia-in-situ-front-prod"
}

export let initOptions = {
    url: keycloakUrl,
    realm: "theia",
    clientId: clientId,
    onLoad: "check-sso",
    promiseType: "native",
    enableLogging: true
};

export let keycloak = Keycloak(initOptions);