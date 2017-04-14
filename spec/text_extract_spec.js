describe("text extraction", function() {
    beforeAll(function() {
        blub = "blub";
        newP = document.createElement("p");
        newP.setAttribute('id', 'copy-input');
        newP.innerHTML = blub + "<br />" + blub;
    });

    it("extracts the text with line breaks", function() {
        expected = blub + "\n" + blub;
        expect(extractText(newP)).toEqual(expected);
    })
});
