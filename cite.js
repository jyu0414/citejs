class Article {
    constructor(bibtexArticle) {
        this.bibtex = bibtexArticle;
        let r = /@([^\{]+)\{([^,]+)/g;
        let m;
        while ((m = r.exec(bibtexArticle)) != null) {
            this.type = m[1];
            this.tag = m[2];
        }
        let r2 = /([^,\s\n]+)[\s]*=[\s]*\{([^\}]+)/g;
        this.properties = {};
        while ((m = r2.exec(bibtexArticle)) != null) {
            this.properties[m[1]] = m[2];
        }
    }
}

class Bibtex {

    showIn(e) {
        let html = "";
        if (e == "default") {
            for(const i in this.articles) {
                html += this.settings.row.before
                for(let key in this.settings.properties) {
                    if (this.articles[i].properties[key]) {
                        html += this.settings.properties[key].before + this.articles[i].properties[key] + this.settings.properties[key].after
                    }
                }
                html += this.settings.row.after
            }
        } else if("texbib") {
            for(const i in this.articles) {
                html += this.settings.row.before + this.settings.bibtex.before + this.articles[i].bibtex + this.settings.bibtex.after +  this.settings.row.after + "\n";
            }
        }
        document.getElementById("table1").innerHTML = html
    }

    loaded(){
        if ((this.httpObj.readyState == 4) && (this.httpObj.status == 200)) {
            this.resp = this.httpObj.responseText;
            let r = /(@)([a-z]+)\{([^,]+),(([^=}]+)(=)[\s]*\{([^\}]+)\}{1}[,]?)+/g;
            this.articles = [];
            let m;
            while ((m = r.exec(this.resp)) != null) {
                this.articles.push(new Article(m[0]));
            }
            this.showIn("default");
        } else {
            console.log("Loading...");
        }
    };

    constructor(file,settings) {
        this.settings = settings;
        this.httpObj = new XMLHttpRequest();
        this.articles = [];
        this.httpObj.onreadystatechange = this.loaded.bind(this);
        if (this.httpObj) {
            this.httpObj.open("GET", file, true);
            this.httpObj.send(null);
        }
    }



}

