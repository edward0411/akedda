<h1>Bienvenido al Dashboard</h1>
<p id="info"></p>

<script>
    async function loadUser() {
        const response = await fetch('/api/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });

        const data = await response.json();
        document.querySelector('#info').innerText = JSON.stringify(data);
    }

    loadUser();
</script>
