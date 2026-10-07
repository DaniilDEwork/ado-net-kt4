const form = document.getElementById("requestForm");
const action = form.dataset.action;
const sendButton = document.getElementById("sendRequest");
const requestError = document.getElementById("requestError");
const responseCode = document.getElementById("responseCode");
const responseType = document.getElementById("responseType");
const responseBody = document.getElementById("responseBody");

form.addEventListener("submit", async event => {
    event.preventDefault();
    sendButton.disabled = true;
    requestError.hidden = true;
    responseCode.textContent = "Ожидание ответа";
    responseCode.className = "";
    responseType.textContent = "Нет данных";
    responseBody.textContent = "";

    const methodSelect = document.getElementById("requestMethod");
    const method = methodSelect ? methodSelect.value : action === "Body" ? "POST" : "GET";
    const options = { method, cache: "no-store", headers: {} };
    let url = `/Echo/${action}`;

    try {
        if (action === "Headers") {
            const name = document.getElementById("headerName").value.trim();
            const value = document.getElementById("headerValue").value;
            options.headers[name] = value;
        }

        if (action === "Query") {
            const text = document.getElementById("queryText").value.trim().replace(/^\?/, "");
            const parameters = new URLSearchParams(text).toString();
            if (parameters !== "") {
                url += `?${parameters}`;
            }
        }

        if (action === "Body") {
            options.headers["Content-Type"] = "text/plain; charset=utf-8";
            options.body = document.getElementById("bodyText").value;
        }

        document.getElementById("sentMethod").textContent = method;
        document.getElementById("sentUrl").textContent = url;

        const response = await fetch(url, options);
        const contentType = response.headers.get("Content-Type");
        const text = await response.text();

        responseCode.textContent = `${response.status} ${response.statusText}`;
        responseCode.className = response.status >= 400 ? "error" : "";
        responseType.textContent = contentType || "Не указан";
        responseBody.textContent = contentType && contentType.includes("application/json")
            ? JSON.stringify(JSON.parse(text), null, 2)
            : text || "Пустой ответ";
    } catch {
        responseCode.textContent = "Ответ не получен";
        responseType.textContent = "Нет данных";
        requestError.textContent = "Не удалось отправить запрос, проверьте подключение и введённые данные";
        requestError.hidden = false;
    } finally {
        sendButton.disabled = false;
    }
});
