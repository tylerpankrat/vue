const app = new Vue({
    el: '#main',   
    data: {
        result: " ",
        responseAvailable: false,
        apiKey: '7a015292b0msh021be62fcabd2a9p1d6b8ajsnc792b637b207'
    },
    mounted() {
        if (localStorage.result) {
            this.result = localStorage.result;
        }
    },
    watch: {
        result(newResult) {
          localStorage.result = newResult;
        }
    },
    methods: {
        fetchAPIData() { 
            this.responseAvailable = false;
            fetch("https://joke3.p.rapidapi.com/v1/joke", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "joke3.p.rapidapi.com",
                    "x-rapidapi-key": this.apiKey,
                    "useQueryString": true
                }
            })
            .then(response => { 
                if(response.ok){
                    return response.json()    
                } else{
                    alert("Server returned " + response.status + " : " + response.statusText);
                }                
            })
            .then(response => {
                this.result = response.content; 
                this.responseAvailable = true;
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
})