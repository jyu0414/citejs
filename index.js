let bibtex;
let setting = {
    parentNode: "table1",
    row: {
        before: "<tr>",
        after: "</tr>"
    },
    bibtex: {
        before: "<td>",
        after: "</td>"
    },
    properties: {
        author: {
            before: "<td>",
            after: "</td>"
        },
        title: {
            before: "<td><b>",
            after: "</td></b>"
        },
        year: {
            before: "<td>",
            after: "</td>"
        },
        publisher: {
            before: "<td>",
            after: "</td>"
        }
    }
};

$(function () {
    bibtex = new Bibtex("ref.bibtex",setting);
    $('#mode input[type=radio]').change(function () {
        switch (this.id) {
            case "option2":
                bibtex.showIn("bibtex");
                break;
            case "option1":
                bibtex.showIn("default");
                break;
            default:
                break;
        }
    });
});