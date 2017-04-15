describe("text extraction", function() {
    var blub = "blub";
    var newP;
    var body;

    beforeAll(function() {
        newP = document.createElement("p");
        newP.innerHTML = blub + "<br />" + blub;
        body = document.getElementsByTagName('body')[0];
        body.appendChild(newP);
    });

    it("extracts the text with line breaks", function() {
        var expected = blub + "\n" + blub;
        expect(extractText(newP)).toEqual(expected);
    })
});
