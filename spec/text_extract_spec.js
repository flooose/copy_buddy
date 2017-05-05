describe("text extraction", function() {
    var blub = "blub";
    var newP;
    var body;
    var textarea;

    beforeAll(function() {
        body = document.getElementsByTagName('body')[0];

        textarea = document.createElement("p");
        textarea.setAttribute("id", "copy-input");
        body.appendChild(textarea);

        newP = document.createElement("p");
        newP.innerHTML = blub + "<br />" + blub;
        body.appendChild(newP);
    });

    it("extracts the text with line breaks", function() {
        var expected = blub + "\n" + blub;
        expect(extractText(newP)).toEqual(expected);
    })
});
